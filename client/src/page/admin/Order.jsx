import { Button, Table, Pagination, Tag, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spin, Input, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  getAllOrder,
  updateOrder,
  getAllOrderAdmin,
} from "../../services/order";
import formatDate from "../../utils/formatDate";
import { toast, ToastContainer, Bounce } from "react-toastify";

const { Search } = Input;

const Order = () => {
  const [data, setData] = useState();
  const [selected, setSelected] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalItem, setTotalItem] = useState(1);
  const [status, setStatus] = useState("ordered");
  const [payment, setPayment] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getData = async (keyword = "") => {
    const response = await getAllOrderAdmin({
      page: currentPage,
      keyword: keyword,
    });
    setCurrentPage(response.currentPage);
    setTotalPage(response.totalPage);
    setTotalItem(response.totalItem);
    setData(response.data);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    const putData = async () => {
      const response = await updateOrder({
        id: selected,
        status: status,
        payment: payment,
      });
      if (response?.error) {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          theme: "light",
        });
      } else {
        getData();
        toast.success("Cập nhật thành công!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          theme: "light",
        });
      }
    };
    putData();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getData();
  }, [currentPage]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Thanh toán",
      dataIndex: "payment",
      key: "payment",
      render: (value) => (
        <>
          {value ? (
            <Tag color="green">Đã thanh toán</Tag>
          ) : (
            <Tag color="red">Chưa thanh toán</Tag>
          )}
        </>
      ),
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "category",
      render: (value) => {
        switch (value) {
          case "ordered":
            return <Tag color="blue">Đặt hàng</Tag>;
          case "prepare":
            return <Tag color="orange">Chuẩn bị</Tag>;
          case "shipping":
            return <Tag color="pink">Vận chuyển</Tag>;
          case "completed":
            return <Tag color="green">Hoàn thành</Tag>;
        }
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_price",
      key: "total_price",
      render: (value) => (
        <div>{new Intl.NumberFormat().format(value * 1000)} đ</div>
      ),
    },
    {
      title: "Người nhận",
      dataIndex: "address",
      key: "name",
      render: (value) => {
        return <div>{value.name}</div>;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (value) => {
        return <div>{value.address}</div>;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "address",
      key: "phone",
      render: (value) => {
        return <div>{value.phone}</div>;
      },
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => <div>{formatDate(value)}</div>,
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      render: (value) => {
        return (
          <div
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              setSelected(value);
              showModal();
            }}
          >
            Sửa
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full mt-5">
      <ToastContainer />
      <Modal
        title={`MÃ ĐƠN HÀNG:  #${selected}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col gap-2">
          <div>Thanh toán:</div>
          <Select
            onChange={(value) => setPayment(value)}
            defaultValue={0}
            options={[
              { value: 0, label: "Chưa thanh toán" },
              { value: 1, label: "Đã thanh toán" },
            ]}
          />
          <div>Trạng thái:</div>
          <Select
            defaultValue={"orderd"}
            onChange={(value) => setStatus(value)}
            options={[
              { value: "orderd", label: "Đặt hàng" },
              { value: "prepare", label: "Chuẩn bị" },
              { value: "shipping", label: "Vận chuyển" },
              { value: "completed", label: "Hoàn thành" },
            ]}
          />
        </div>
      </Modal>
      <div className="w-full px-8">
        <div className="text-2xl font-semibold">Product</div>
        <div className="flex justify-between items-center">
          <Search
            className="w-[500px] my-5"
            onInput={(e) => {
              const value = e.target.value;
              if (value.length > 0) {
                getData(value);
              } else {
                getData();
              }
            }}
          />
        </div>
        {data ? (
          <div>
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
              size="middle"
              className="bg-white rounded-xl p-5 pb-[50px]"
            />
            <Pagination
              align="end"
              defaultCurrent={currentPage}
              total={totalItem}
              onChange={(page) => {
                setCurrentPage(page);
              }}
              className="-mt-10 mr-4"
            />
          </div>
        ) : (
          <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            className="w-full mt-[350px] mx-auto"
          />
        )}
      </div>
    </div>
  );
};

export default Order;
