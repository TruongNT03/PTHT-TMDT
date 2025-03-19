import { useForm } from "react-hook-form";
import Dialog from "../../components/dialog/Dialog";
import Table from "../../components/table/Table";
import InputDialog from "../../components/dialog/InputDialog";
import { useState } from "react";

const Product = () => {
  const [dialogData, setDialogData] = useState({
    id: 1,
    name: "Quần bò wide fit",
    description: "Chất liệu 100% cotton",
    price: 200,
    stock: 10,
    image:
      "https://bizweb.dktcdn.net/100/455/315/products/2-jpeg-3231af07-7bc0-4973-a4f1-bb844514d6d5.jpg?v=1653291329997",
    subCategory: {
      name: "Quần bò",
    },
    section: {
      name: "NỮ",
    },
  });
  const [isClose, setIsClose] = useState(true);
  const isCloseHandle = () => {
    setIsClose((prev) => !prev);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: dialogData });
  const head = [
    "ID",
    "Name",
    "Description",
    "Price",
    "Stock",
    "Image",
    "SubCategory",
    "Section",
  ];
  const fakeData = [
    {
      id: 1,
      name: "Quần bò wide fit",
      description: "Chất liệu 100% cotton",
      price: 200,
      stock: 10,
      image:
        "https://bizweb.dktcdn.net/100/455/315/products/2-jpeg-3231af07-7bc0-4973-a4f1-bb844514d6d5.jpg?v=1653291329997",
      subCategory: {
        name: "Quần bò",
      },
      section: {
        name: "NỮ",
      },
    },
    {
      id: 1,
      name: "Quần bò wide fit",
      description: "Chất liệu 100% cotton",
      price: 200,
      stock: 10,
      image:
        "https://bizweb.dktcdn.net/100/455/315/products/2-jpeg-3231af07-7bc0-4973-a4f1-bb844514d6d5.jpg?v=1653291329997",
      subCategory: {
        name: "Quần bò",
      },
      section: {
        name: "NỮ",
      },
    },
    {
      id: 1,
      name: "Quần bò wide fit",
      description: "Chất liệu 100% cotton",
      price: 200,
      stock: 10,
      image:
        "https://bizweb.dktcdn.net/100/455/315/products/2-jpeg-3231af07-7bc0-4973-a4f1-bb844514d6d5.jpg?v=1653291329997",
      subCategory: {
        name: "Quần bò",
      },
      section: {
        name: "NỮ",
      },
    },
    {
      id: 1,
      name: "Quần bò wide fit",
      description: "Chất liệu 100% cotton",
      price: 200,
      stock: 10,
      image:
        "https://bizweb.dktcdn.net/100/455/315/products/2-jpeg-3231af07-7bc0-4973-a4f1-bb844514d6d5.jpg?v=1653291329997",
      subCategory: {
        name: "Quần bò",
      },
      section: {
        name: "NỮ",
      },
    },
    {
      id: 1,
      name: "Quần bò wide fit",
      description: "Chất liệu 100% cotton",
      price: 200,
      stock: 10,
      image:
        "https://bizweb.dktcdn.net/100/455/315/products/2-jpeg-3231af07-7bc0-4973-a4f1-bb844514d6d5.jpg?v=1653291329997",
      subCategory: {
        name: "Quần bò",
      },
      section: {
        name: "NỮ",
      },
    },
    {
      id: 1,
      name: "Quần bò wide fit",
      description: "Chất liệu 100% cotton",
      price: 200,
      stock: 10,
      image:
        "https://bizweb.dktcdn.net/100/455/315/products/2-jpeg-3231af07-7bc0-4973-a4f1-bb844514d6d5.jpg?v=1653291329997",
      subCategory: {
        name: "Quần bò",
      },
      section: {
        name: "NỮ",
      },
    },
    {
      id: 1,
      name: "Quần bò wide fit",
      description: "Chất liệu 100% cotton",
      price: 200,
      stock: 10,
      image:
        "https://bizweb.dktcdn.net/100/455/315/products/2-jpeg-3231af07-7bc0-4973-a4f1-bb844514d6d5.jpg?v=1653291329997",
      subCategory: {
        name: "Quần bò",
      },
      section: {
        name: "NỮ",
      },
    },
    {
      id: 1,
      name: "Quần bò wide fit",
      description: "Chất liệu 100% cotton",
      price: 200,
      stock: 10,
      image:
        "https://bizweb.dktcdn.net/100/455/315/products/2-jpeg-3231af07-7bc0-4973-a4f1-bb844514d6d5.jpg?v=1653291329997",
      subCategory: {
        name: "Quần bò",
      },
      section: {
        name: "NỮ",
      },
    },
    {
      id: 1,
      name: "Quần bò wide fit",
      description: "Chất liệu 100% cotton",
      price: 200,
      stock: 10,
      image:
        "https://bizweb.dktcdn.net/100/455/315/products/2-jpeg-3231af07-7bc0-4973-a4f1-bb844514d6d5.jpg?v=1653291329997",
      subCategory: {
        name: "Quần bò",
      },
      section: {
        name: "NỮ",
      },
    },
    {
      id: 1,
      name: "Quần bò wide fit",
      description: "Chất liệu 100% cotton",
      price: 200,
      stock: 10,
      image:
        "https://bizweb.dktcdn.net/100/455/315/products/2-jpeg-3231af07-7bc0-4973-a4f1-bb844514d6d5.jpg?v=1653291329997",
      subCategory: {
        name: "Quần bò",
      },
      section: {
        name: "NỮ",
      },
    },
  ];
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="flex-1 h-screen">
      <Table data={fakeData} head={head} isCloseHandle={isCloseHandle} />
      {isClose ? (
        <></>
      ) : (
        <Dialog
          dialogTitle="Thông tin sản phẩm"
          labelSubmit="Cập nhập sản phẩm"
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isCloseHandle={isCloseHandle}
        >
          {head.map((value, index) => {
            if (value === "ID") {
              return (
                <InputDialog
                  key={index}
                  disabled={true}
                  label={value?.name || value}
                  register={register(value.toLowerCase())}
                />
              );
            } else {
              return (
                <InputDialog
                  key={index}
                  label={value?.name || value}
                  register={register(value.toLowerCase())}
                />
              );
            }
          })}
        </Dialog>
      )}
    </div>
  );
};

export default Product;
