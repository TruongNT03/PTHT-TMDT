import { Form, Input, Upload, Checkbox, Button } from "antd";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { useEffect, useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import VariantOption from "../../components/dialog/VariantOption";
import { CiCircleMinus } from "react-icons/ci";
import insertProduct from "../../services/productService/insertProduct";
import getAllDropDown from "../../services/productService/getAllDropDown";
import { useNavigate, useParams } from "react-router-dom";
import getProductById from "../../services/productService/getProductById";
import { Editor } from "@tinymce/tinymce-react";
const EditProduct = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState(1);
  const [section, setSection] = useState(1);
  const [variants, setVariants] = useState([
    {
      variantList: [{ variant: "", value: "" }],
      price: "",
      discount_price: "",
      stock: "",
    },
  ]);
  const navigate = useNavigate();
  const formData = new FormData();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      values?.product_images?.fileList.forEach((value) => {
        formData.append(`product_images`, value.originFileObj);
      });
      variants.forEach((_value, index) => {
        formData.append(
          "variant_images",
          values[`variant_images_${index}`].fileList[0].originFileObj
        );
      });
      const data = {
        name: values.name,
        description: values.description,
        category_id: category,
        section_id: section,
        variants: variants,
      };
      formData.append("data", JSON.stringify(data));
      console.log("formData", formData);
      // if (!response?.errors || !response?.error) {
      //   toast.error(response?.message || "Có lỗi xảy ra", {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     transition: Bounce,
      //   });
      // } else {
      //   toast.success("Thêm mới thành công!", {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     transition: Bounce,
      //     onClose: () => {
      //       navigate("/admin/product");
      //     },
      //   });
      // }
    } catch (error) {
      toast.error("Có lỗi xảy ra", {
        position: "top-right",
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
      setProduct(product.data);
    };
    getData();
  }, []);
  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        category_id: category,
        section_id: section,
      });
    }
  }, [product, category, section]);
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
                <Editor
                  // onEditorChange={(content, editor) => {
                  //   setDescription(content);
                  // }}
                  initialValue={product.description}
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
              </Form.Item>
              <div className="h-[2px] bg-gray-light my-14"></div>
              <div className="text-2xl font-semibold mb-5">Images</div>
              <div className="flex flex-wrap gap-4">
                {product?.product_images?.map((value, index) => (
                  <img
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
                    <div className="my-3">
                      {value?.variant?.map((value, index) => (
                        <div className="font-normal text-base">
                          <div>Variant: {value?.name}</div>
                          <div>Value: {value?.value}</div>
                        </div>
                      ))}

                      <div>
                        <span>{value?.variant?.value}</span>
                        <span>{value?.variant?.name}</span>
                      </div>
                      <img
                        src={process.env.REACT_APP_SERVER_URL + value?.image}
                        alt=""
                        className="w-32 h-32 object-cover rounded-md shadow"
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">
                          {value?.price}
                        </span>
                        <span className="text-sm font-semibold">
                          {value?.old_price}
                        </span>
                        <span className="text-sm font-semibold">
                          {value?.stock}
                        </span>
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
                <Form.Item>
                  {categories.map((value, index) => (
                    <>
                      <Checkbox
                        key={index}
                        checked={value.id === product?.category_id}
                        onClick={() => setCategory(value.id)}
                      >
                        {value.name}
                      </Checkbox>
                      <br />
                    </>
                  ))}
                </Form.Item>
              </div>
              <div className="bg-white rounded-2xl p-8">
                <div className="text-2xl font-semibold mb-5">Section</div>
                <Form.Item>
                  {sections.map((value, index) => (
                    <>
                      <Checkbox
                        key={index}
                        checked={value.id === product?.section_id}
                        onClick={() => setSection(value.id)}
                      >
                        {value.name}
                      </Checkbox>
                      <br />
                    </>
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
