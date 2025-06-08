import { Button, Form, Input, Upload, Select, Divider, Space } from "antd";
import { useRef, useState } from "react";
import { FiDelete } from "react-icons/fi";
import { CgSoftwareUpload } from "react-icons/cg";
import { LuListPlus, LuListX } from "react-icons/lu";

import { PlusOutlined } from "@ant-design/icons";

const option = [
  {
    label: "Size",
    value: ["S", "M", "L", "XL"],
  },
  {
    label: "Color",
    value: "Color",
  },
];

const VariantOption = ({
  setVariants,
  indexOfVariantProduct,
  hasVariant = true,
}) => {
  const [variant, setVariant] = useState([{ variant: "", value: "" }]);

  let index = 0;
  const [items, setItems] = useState(["jack", "lucy"]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const selectRef = useRef(null);
  console.log(selectRef);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      var _a;
      (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, 0);
  };

  return (
    <>
      {hasVariant && (
        <div className="font-medium mb-3 flex items-center gap-5">
          <div>Variants:</div>
          <LuListPlus
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              setVariant((prev) => [...prev, { variant: "", value: "" }]);
            }}
          />
        </div>
      )}

      {variant.map((value, indexOfListVariant) => (
        <div className="flex items-center gap-10">
          {hasVariant && (
            <>
              <Form.Item
                className="flex-[1]"
                label="Variant:"
                required
                rules={[{ required: true, message: "Please input variant!" }]}
              >
                <Select
                  style={{ width: 300 }}
                  placeholder="custom dropdown render"
                  ref={selectRef}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <Space style={{ padding: "0 8px 4px" }}>
                        <Input
                          placeholder="Please enter item"
                          ref={inputRef}
                          value={name}
                          onChange={onNameChange}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={addItem}
                        >
                          Add item
                        </Button>
                      </Space>
                    </>
                  )}
                  options={option.map((item) => ({
                    label: item.label,
                    value: item.label,
                  }))}
                />

                {/* <Input
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
                /> */}
              </Form.Item>

              <Form.Item
                className="flex-[1]"
                label="Value:"
                required
                rules={[{ required: true, message: "Please input value!" }]}
              >
                <Select
                  style={{ width: 300 }}
                  placeholder={`Select ${selectRef.current.nativeElement.innerText}`}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <Space style={{ padding: "0 8px 4px" }}>
                        <Input
                          placeholder="Please enter item"
                          ref={inputRef}
                          value={name}
                          onChange={onNameChange}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={addItem}
                        >
                          Add item
                        </Button>
                      </Space>
                    </>
                  )}
                  options={option.map((item) => ({
                    label: item.label,
                    value: item.label,
                  }))}
                />
                {/* <Input
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
                /> */}
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
            </>
          )}
        </div>
      ))}

      <div className="font-medium mb-3">Information:</div>
      <div className="flex gap-10">
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
          className="flex-[1]"
          label="Old price:"
          rules={[{ required: false, message: "Please input old price!" }]}
        >
          <Input
            onChange={(e) =>
              setVariants((prev) => [
                ...prev.filter((value, index) => {
                  if (index === indexOfVariantProduct) {
                    value.old_price = e.target.value;
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
