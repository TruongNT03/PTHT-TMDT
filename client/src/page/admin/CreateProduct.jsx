import { Form, Input, Upload, Checkbox, Button, Switch } from "antd";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { useEffect, useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import VariantOption from "../../components/dialog/VariantOption";
import { CiCircleMinus } from "react-icons/ci";
import insertProduct from "../../services/productService/insertProduct";
import getAllDropDown from "../../services/productService/getAllDropDown";
import { useNavigate, useParams } from "react-router-dom";

import { Editor } from "@tinymce/tinymce-react";

const CreateProduct = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [hasVariant, setHasVariant] = useState(false);
  const [sections, setSections] = useState([]);
  const [category, setCategory] = useState(1);
  const [section, setSection] = useState(1);
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState([
    {
      variantList: [{ variant: "", value: "" }],
      price: "",
      old_price: "",
      stock: "",
    },
  ]);
  const toogleOnChange = (checked) => {
    console.log(checked);
    setHasVariant(checked);
  };
  const navigate = useNavigate();
  const formData = new FormData();
  const onFinish = async (values) => {
    try {
      values?.product_images?.fileList.forEach((value) => {
        formData.append(`product_images`, value.originFileObj);
      });
      // let data = {};
      // if (hasVariant) {
      variants.forEach((_value, index) => {
        formData.append(
          "variant_images",
          values[`variant_images_${index}`].fileList[0].originFileObj
        );
      });
      const data = {
        name: values.name,
        description: description,
        category_id: category,
        section_id: section,
        variants: variants,
      };
      // } else {
      //   data = {
      //     name: values.name,
      //     description: values.description,
      //     category_id: category,
      //     section_id: section,
      //     price: values.price,
      //     discount_price: values.discount_price,
      //     stock: values.stock,
      //   };
      // }
      formData.append("data", JSON.stringify(data));
      const response = await insertProduct(formData);
      if (response?.errors || response?.error) {
        toast.error(response?.message || "Có lỗi xảy ra", {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.success("Thêm mới thành công!", {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
          transition: Bounce,
          onClose: () => {
            navigate("/admin/product");
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  useEffect(() => {
    const getData = async () => {
      const sectionList = await getAllDropDown("section");
      const categoryList = await getAllDropDown("category");
      setCategories(categoryList.data);
      setSections(sectionList.data);
    };
    getData();
  }, []);
  return (
    <div className="w-full">
      <div className="">
        <ToastContainer
          onClick={() => {
            navigate("/admin/product");
          }}
        />
        <Form className="w-full p-8" layout="vertical" onFinish={onFinish}>
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
              {/* <Form.Item
                label="Product Description:"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input product description!",
                  },
                ]}
              >
                <Input.TextArea autoSize={{ maxRows: 10, minRows: 10 }} />
              </Form.Item> */}
              <div>
                <Form.Item label="Product Description">
                  <Editor
                    onEditorChange={(content, editor) => {
                      setDescription(content);
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
                </Form.Item>
              </div>

              <div className="h-[2px] bg-gray-light my-14"></div>
              <div className="text-2xl font-semibold mb-5">Images</div>
              <Form.Item
                name="product_images"
                rules={[
                  { required: true, message: "Please input product images!" },
                ]}
              >
                <Upload
                  beforeUpload={() => false}
                  multiple
                  className="w-full h-[200px] flex gap-5 items-center justify-center border-dashed border-[2px] rounded-md border-gray-light"
                >
                  <Button icon={<CgSoftwareUpload fontSize={24} />}>
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
              <div className="h-[2px] bg-gray-light my-14"></div>
              <div className="text-2xl font-semibold mb-5">
                Different Options
              </div>
              <div className="flex mb-5 gap-5">
                <Switch onChange={toogleOnChange} />
                <div>This product has variant</div>
              </div>
              {/* {hasVariant && */}
              {variants.map((value, index1) =>
                index1 === 0 ? (
                  <VariantOption
                    key={index1}
                    variants={variants}
                    setVariants={setVariants}
                    indexOfVariantProduct={index1}
                    hasVariant={hasVariant}
                  />
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="flex-[1] h-[2px] bg-gray-light my-14"></div>
                      <CiCircleMinus
                        className="text-rose-500 text-2xl cursor-pointer"
                        onClick={() =>
                          setVariants((prev) =>
                            prev.filter((item, index2) => (index1 = index2))
                          )
                        }
                      />
                    </div>
                    <VariantOption
                      variants={variants}
                      setVariants={setVariants}
                      indexOfVariantProduct={index1}
                      formData={formData}
                    />
                  </>
                )
              )}
              {hasVariant && (
                <div
                  className="text-blue-500 cursor-pointer"
                  onClick={() => {
                    setVariants((prev) => {
                      return [
                        ...prev,
                        {
                          variantList: [{ variant: "", value: "" }],
                          price: "",
                          old_price: "",
                          stock: "",
                        },
                      ];
                    });
                  }}
                >
                  Add More
                </div>
              )}
            </div>
            <div className="flex-[1] flex flex-col gap-10">
              <div className="bg-white rounded-2xl p-8">
                <div className="text-2xl font-semibold mb-5">Categories</div>
                <Form.Item>
                  {categories.map((value, index) => (
                    <>
                      <Checkbox
                        key={index}
                        checked={value.id === category}
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
                        checked={value.id === section}
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

export default CreateProduct;
