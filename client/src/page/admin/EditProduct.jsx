import { Form, Input, Upload, Checkbox, Button } from "antd";
import { useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import VariantOption from "../../components/dialog/VariantOption";
import { CiCircleMinus } from "react-icons/ci";
import insertProduct from "../../services/productService/insertProduct";

const EditProduct = () => {
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
  const onFinish = async (values) => {
    const form = new FormData();
    const data = {
      name: values.name,
      description: values.description,
      category_id: category,
      section_id: section,
      // product_images: values.images.fileList,
      product_images: [],
      variants: variants,
    };
    console.log(data);
    await insertProduct(data);
  };
  const categories = [
    { id: 1, name: "Quần" },
    { id: 2, name: "Áo" },
    { id: 3, name: "Giày" },
    { id: 4, name: "Trang sức" },
    { id: 5, name: "Phụ kiện" },
  ];
  return (
    <div className="w-full">
      <div className="">
        <Form className="w-full p-8" layout="vertical" onFinish={onFinish}>
          <div className="flex gap-10">
            <div className="flex-[3] bg-white p-8 rounded-2xl">
              <div className="text-2xl font-semibold mb-5">
                Product Information
              </div>
              <Form.Item label="Product Name:" name="name" required>
                <Input></Input>
              </Form.Item>
              <Form.Item label="Product Description:" name="description">
                <Input.TextArea
                  autoSize={{ maxRows: 10, minRows: 10 }}
                ></Input.TextArea>
              </Form.Item>
              <div className="h-[2px] bg-gray-light my-14"></div>
              <div className="text-2xl font-semibold mb-5">Images</div>
              <Form.Item name="images">
                <Upload
                  multiple
                  className="w-full h-[200px] flex items-center justify-center border-dashed border-[2px] rounded-md border-gray-light"
                >
                  <Button icon={<CgSoftwareUpload fontSize={24} />}>
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
              <div className="h-[2px] bg-gray-light my-14"></div>
              <div className="text-2xl font-semibold mb-5">
                Variant Products
              </div>
              {variants.map((value, index1) =>
                index1 === 0 ? (
                  <VariantOption
                    variants={variants}
                    setVariants={setVariants}
                    indexOfVariantProduct={index1}
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
                    />
                  </>
                )
              )}
              <div
                className="text-blue-500 cursor-pointer"
                onClick={() => {
                  setVariants((prev) => {
                    return [
                      ...prev,
                      {
                        variantList: [{ variant: "", value: "" }],
                        price: "",
                        discount_price: "",
                        stock: "",
                      },
                    ];
                  });
                }}
              >
                Add More
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
                <div className="text-2xl font-semibold mb-5">Categories</div>
                <Form.Item>
                  {categories.map((value, index) => (
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
              <Button type="default">Cancel</Button>
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
