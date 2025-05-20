import { Button, Form, Input, message, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { MdUpload } from "react-icons/md";
import { toast, ToastContainer, Bounce } from "react-toastify";

import { getAllCategory, insertCategory } from "../../services/category";
import Card from "../../components/category/Card";

const Category = () => {
  const [data, setData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const getData = async () => {
    const response = await getAllCategory();
    if (!response.error) {
      setData(response.data);
    }
  };
  const onFinish = async (data) => {
    const response = await insertCategory({ name: data.name });
    if (response.error) {
      toast.error(response?.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        theme: "light",
      });
    } else {
      toast.success("Thêm mới thành công!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        theme: "light",
      });
      setIsOpen(false);
      getData();
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full p-8">
      <ToastContainer />
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
