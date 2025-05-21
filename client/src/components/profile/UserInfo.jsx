import React, { useContext, useState } from "react";
import { HeaderContext } from "../../contexts/HeaderContext";
import { Input, Form, Modal, Upload, Button } from "antd";
import { GoUpload } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import { BsPencilSquare } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";

import updateUser from "../../services/authService/updateUser";

const UserInfo = ({ className }) => {
  const { user } = useContext(HeaderContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    onFinish();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    const update = async () => {
      const response = await updateUser({
        firstname: values.firstname,
        lastname: values.lastname,
      });
      if (!response.error) {
        toast.success("Cập nhật thành công", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          theme: "light",
        });
        window.location.reload();
      } else {
        toast.error("Cập nhật thất bại", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          theme: "light",
        });
      }
    };
    update();
  };
  return (
    <>
      <ToastContainer />
      <div className="flex justify-between">
        <Modal
          title="Chỉnh sửa thông tin"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="firstname"
              label="Họ"
              rules={[
                {
                  required: true,
                  pattern: /^[A-Za-zÀ-Ỹà-ỹĂăÂâĐđÊêÔôƠơƯư\s]+$/,
                  message: "Tên chỉ gồm các chữ cái",
                },
              ]}
            >
              <Input defaultValue={user?.firstname} />
            </Form.Item>
            <Form.Item
              name="lastname"
              label="Tên"
              rules={[
                {
                  required: true,
                  pattern: /^[A-Za-zÀ-Ỹà-ỹĂăÂâĐđÊêÔôƠơƯư\s]+$/,
                  message: "Tên chỉ gồm các chữ cái",
                },
              ]}
            >
              <Input defaultValue={user?.lastname} />
            </Form.Item>
            <Form.Item label="Ảnh đại hiện" name="avatar">
              <Upload>
                <Button icon={<GoUpload />}>Chọn ảnh</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                OK
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div className={`flex flex-col gap-4 text-sm ${className}`}>
          <div className="uppercase text-xl">Thông tin tài khoản</div>
          <div className="flex gap-1 font-bold">
            Họ: <div className="font-normal">{user?.firstname}</div>
          </div>
          <div className="flex gap-1 font-bold">
            Tên: <div className="font-normal">{user?.lastname}</div>
          </div>
          <div className="flex gap-1 font-bold">
            Email: <div className="font-normal">{user?.email}</div>
          </div>
          <div
            className="flex items-center gap-1 font-bold cursor-pointer hover:text-secondary"
            onClick={showModal}
          >
            Chỉnh sửa thông tin
            <BsPencilSquare />
          </div>
        </div>
        <div className="flex flex-col gap-4 item">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt=""
              className="h-[200px] w-[200px] rounded-full"
            />
          ) : (
            <RxAvatar className="w-[200px] h-[200px]" />
          )}
        </div>
      </div>
    </>
  );
};

export default UserInfo;
