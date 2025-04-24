import { Button, Table, Pagination, Tag, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spin, Input, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getAllOrder } from "../../services/order";
import formatDate from "../../utils/formatDate";
const { Search } = Input;

const Order = () => {
  const [data, setData] = useState();
  const [selected, setSelected] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalItem, setTotalItem] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const getData = async () => {
      const response = await getAllOrder({ page: currentPage });
      setCurrentPage(response.currentPage);
      setTotalPage(response.totalPage);
      setTotalItem(response.totalItem);
      setData(response.data);
    };
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
      title: "Tổng tiền",
      dataIndex: "total_price",
      key: "total_price",
      render: (value) => (
        <div>{new Intl.NumberFormat().format(value * 1000)} đ</div>
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
      <Modal
        title={`MÃ ĐƠN HÀNG:  #${selected}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col gap-2">
          <div>Thanh toán:</div>
          <Select
            defaultValue={1}
            options={[
              { value: 1, label: "Chưa thanh toán" },
              { value: 0, label: "Đã thanh toán" },
            ]}
          />
          <div>Trạng thái:</div>
          <Select
            defaultValue={"orderd"}
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
          <Search className="w-[500px] my-5" />
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
