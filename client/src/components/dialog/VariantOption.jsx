import { Button, Form, Input, Upload } from "antd";
import { useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import { LuListPlus, LuListX } from "react-icons/lu";

const VariantOption = ({ setVariants, indexOfVariantProduct }) => {
  const [variant, setVariant] = useState([{ variant: "", value: "" }]);
  return (
    <>
      <div className="font-medium mb-3 flex items-center gap-5">
        <div>Variants:</div>
        <LuListPlus
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            setVariant((prev) => [...prev, { variant: "", value: "" }]);
          }}
        />
      </div>

      {variant.map((value, indexOfListVariant) => (
        <div className="flex items-center gap-10">
          <Form.Item
            className="flex-[1]"
            label="Variant:"
            required
            rules={[{ required: true, message: "Please input variant!" }]}
          >
            <Input
              onChange={(e) =>
                setVariants((prev) => [
                  ...prev.filter((value, index) => {
                    if (index === indexOfVariantProduct) {
                      value.variantList = variant;
                      value.variantList[indexOfListVariant].variant =
                        e.target.value;
                      return value;
                    } else {
                      return value;
                    }
                  }),
                ])
              }
            ></Input>
          </Form.Item>
          <Form.Item
            className="flex-[1]"
            label="Value:"
            required
            rules={[{ required: true, message: "Please input value!" }]}
          >
            <Input
              onChange={(e) =>
                setVariants((prev) => [
                  ...prev.filter((value, index) => {
                    if (index === indexOfVariantProduct) {
                      value.variantList = variant;
                      value.variantList[indexOfListVariant].value =
                        e.target.value;
                      return value;
                    } else {
                      return value;
                    }
                  }),
                ])
              }
            />
          </Form.Item>
          {indexOfListVariant === 0 ? (
            <LuListX className="opacity-0" />
          ) : (
            <LuListX
              className="cursor-pointer text-red"
              onClick={() => {
                setVariant((prev) =>
                  prev.filter(
                    (value, indexOfVariant) =>
                      indexOfVariant !== indexOfListVariant
                  )
                );
              }}
            />
          )}
        </div>
      ))}

      <div className="font-medium mb-3">Information:</div>
      <div className="flex gap-10">
        <Form.Item
          className="flex-[1]"
          label="Discount price:"
          required
          rules={[{ required: true, message: "Please input discount price!" }]}
        >
          <Input
            onChange={(e) =>
              setVariants((prev) => [
                ...prev.filter((value, index) => {
                  if (index === indexOfVariantProduct) {
                    value.discount_price = e.target.value;
                    return value;
                  } else {
                    return value;
                  }
                }),
              ])
            }
          />
        </Form.Item>
        <Form.Item
          className="flex-[1]"
          label="Price:"
          required
          rules={[{ required: true, message: "Please input price!" }]}
        >
          <Input
            onChange={(e) =>
              setVariants((prev) => [
                ...prev.filter((value, index) => {
                  if (index === indexOfVariantProduct) {
                    value.price = e.target.value;
                    return value;
                  } else {
                    return value;
                  }
                }),
              ])
            }
          />
        </Form.Item>
        <Form.Item
          label="Stock:"
          className="flex-[1]"
          required
          rules={[{ required: true, message: "Please input stock!" }]}
        >
          <Input
            onChange={(e) =>
              setVariants((prev) => [
                ...prev.filter((value, index) => {
                  if (index === indexOfVariantProduct) {
                    value.stock = e.target.value;
                    return value;
                  } else {
                    return value;
                  }
                }),
              ])
            }
          />
        </Form.Item>
        <Form.Item
          className="flex-[1]"
          label="Image:"
          name={`variant_images_${indexOfVariantProduct}`}
          rules={[{ required: true, message: "Please input variant image!" }]}
        >
          <Upload beforeUpload={() => false}>
            <Button icon={<CgSoftwareUpload fontSize={24} />}>
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>
      </div>
    </>
  );
};

export default VariantOption;
