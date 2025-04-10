import { Button, Form, Input, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { MdUpload } from "react-icons/md";

import { getAllCategory } from "../../services/category";
import Card from "../../components/category/Card";

const Category = () => {
  const [data, setData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const onFinish = (data) => {
    console.log(data);
  };
  useEffect(() => {
    const getData = async () => {
      const response = await getAllCategory();
      if (!response.error) {
        setData(response.data);
      }
    };
    getData();
  }, []);
  return (
    <div className="w-full p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-semibold mb-5">Category</div>
        <Button
          type="primary"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Create new
        </Button>
      </div>
      <div className="flex flex-wrap gap-7">
        {data?.map((value, index) => (
          <Card key={index} title={value.name} />
        ))}
      </div>
      <Modal
        open={isOpen}
        title="Create new"
        footer={false}
        onCancel={() => {
          setIsOpen(false);
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name:" required className="mt-5" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Image:" required name="image">
            <Upload>
              <Button icon={<MdUpload />}>Choose File</Button>
            </Upload>
          </Form.Item>
          <div className="flex justify-end gap-3">
            <Button
              type="default"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
