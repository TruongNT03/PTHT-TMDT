import { Form, Input, Checkbox, Button } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import getAllDropDown from "../../services/productService/getAllDropDown";
import { useNavigate, useParams } from "react-router-dom";
import getProductById from "../../services/productService/getProductById";
import { Editor } from "@tinymce/tinymce-react";

import updateProduct from "../../services/productService/updateProduct";

const EditorField = ({ value = "", onChange }) => {
  return (
    <Editor
      value={value}
      onEditorChange={(content, editor) => {
        onChange(content);
      }}
      apiKey="6p39nxjk9unxi9dguqp0bl9rdb52mgyo5tjr30yo6agxqd1a"
      init={{
        plugins: [
          "anchor",
          "autolink",
          "charmap",
          "codesample",
          "emoticons",
          "image",
          "link",
          "lists",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
        menubar: false,
        content_style:
          "body { font-family:SF Pro Display, sans-serif; font-size:14px }",
      }}
    />
  );
};

const EditProduct = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState(1);
  const [section, setSection] = useState(1);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("values", values);
    const response = await updateProduct(values, product.id);
    if (response?.error || response?.erorrs) {
      toast.error("Có lỗi xảy ra!", {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        theme: "light",
      });
    } else {
      toast.success("Cập nhập thành công!", {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        theme: "light",
      });
    }
  };
  useEffect(() => {
    const getData = async () => {
      const sectionList = await getAllDropDown("section");
      const categoryList = await getAllDropDown("category");
      const product = await getProductById(id);
      setCategories(categoryList.data);
      setSections(sectionList.data);
      setCategory(product.data.category_id);
      setSection(product.data.section_id);
      setProduct(product.data);
    };
    getData();
  }, [id]);
  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        category_id: category,
        section_id: section,
        product_variants: product?.product_variants?.map((variant) => ({
          id: variant.id,
          price: variant.price,
          old_price: variant.old_price,
          stock: variant.stock,
        })),
      });
    }
  }, [product, category, section, form]);
  return (
    <div className="w-full">
      <div className="">
        <ToastContainer />
        <Form
          className="w-full p-8"
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <div className="flex gap-10">
            <div className="flex-[3] bg-white p-8 rounded-2xl">
              <div className="text-2xl font-semibold mb-5">
                Product Information
              </div>
              <Form.Item
                label="Product Name:"
                name="name"
                rules={[
                  { required: true, message: "Please input product name!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Product Description:"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input product description!",
                  },
                ]}
              >
                <EditorField />
              </Form.Item>
              <div className="h-[2px] bg-gray-light my-14"></div>
              <div className="text-2xl font-semibold mb-5">Images</div>
              <div className="flex flex-wrap gap-4">
                {product?.product_images?.map((value, index) => (
                  <img
                    key={index}
                    src={process.env.REACT_APP_SERVER_URL + value?.path}
                    alt=""
                    className="w-32 h-32 object-cover rounded-md shadow"
                  />
                ))}
              </div>

              <div className="h-[2px] bg-gray-light my-14"></div>
              <div className="text-2xl font-semibold mb-5">
                Variant Products
                {product?.product_variants?.map((value, index) => {
                  return (
                    <div className="my-3" key={index}>
                      <Form.Item
                        name={["product_variants", index, "id"]}
                        hidden
                      >
                        <Input />
                      </Form.Item>

                      {value?.variant?.map((value, index) => (
                        <div className="font-normal text-base" key={index}>
                          <div className="flex gap-1">
                            <div className="font-medium">Variant:</div>{" "}
                            {value?.name}
                          </div>
                          <div className="flex gap-1">
                            <div className="font-medium">Value:</div>{" "}
                            {value?.value}
                          </div>
                        </div>
                      ))}

                      <div>
                        <span>{value?.variant?.value}</span>
                        <span>{value?.variant?.name}</span>
                      </div>
                      <img
                        src={process.env.REACT_APP_SERVER_URL + value?.image}
                        alt=""
                        className="w-32 h-32 object-cover rounded-md shadow my-3"
                      />
                      <div className="flex items-center gap-10 mt-8 font-normal">
                        <Form.Item
                          name={["product_variants", index, "price"]}
                          label="Price"
                          className="flex-1"
                          required
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name={["product_variants", index, "old_price"]}
                          label="Old Price"
                          className="flex-1"
                          required
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name={["product_variants", index, "stock"]}
                          label="Stock"
                          className="flex-1"
                          required
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <div className="h-[2px] bg-gray-light my-14"></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-[1] flex flex-col gap-10">
              <div className="bg-white rounded-2xl p-8">
                <div className="text-2xl font-semibold mb-5">Categories</div>
                <Form.Item name="category_id">
                  {categories.map((value, index) => (
                    <div key={index}>
                      <Checkbox
                        key={index}
                        checked={value.id === category}
                        onClick={() => setCategory(value.id)}
                      >
                        {value.name}
                      </Checkbox>
                      <br />
                    </div>
                  ))}
                </Form.Item>
              </div>
              <div className="bg-white rounded-2xl p-8">
                <div className="text-2xl font-semibold mb-5">Section</div>
                <Form.Item name="section_id">
                  {sections.map((value, index) => (
                    <div key={index}>
                      <Checkbox
                        key={index}
                        checked={value.id === section}
                        onClick={() => setSection(value.id)}
                      >
                        {value.name}
                      </Checkbox>
                      <br />
                    </div>
                  ))}
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="h-[2px] bg-gray-light my-14"></div>
          <div className="flex justify-end gap-5">
            <Form.Item>
              <Button
                type="default"
                onClick={() => {
                  navigate("/admin/product");
                }}
              >
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;
