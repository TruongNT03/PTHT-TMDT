import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import Dialog from "../../components/dialog/Dialog";
import Table from "../../components/table/Table";
import InputDialog from "../../components/dialog/InputDialog";
import { ProductContext } from "../../contexts/ProductContext";

const Product = () => {
  const { dialogData, isClose } = useContext(ProductContext);
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm({ defaultValues: dialogData });
  const head = [
    {
      label: "ID",
      hasDropdown: false,
      type: "text",
      name: "id",
    },
    {
      label: "Name",
      hasDropdown: false,
      type: "text",
      name: "name",
    },
    {
      label: "Description",
      hasDropdown: false,
      type: "text",
      name: "description",
    },
    {
      label: "Price",
      hasDropdown: false,
      type: "text",
      name: "price",
    },
    {
      label: "Stock",
      hasDropdown: false,
      type: "text",
      name: "stock",
    },
    {
      label: "Image",
      hasDropdown: false,
      type: "file",
      name: "image",
    },
    {
      label: "Subcategory",
      hasDropdown: true,
      type: "text",
      name: "subcategory",
    },
    {
      label: "Section",
      hasDropdown: true,
      type: "text",
      name: "section",
    },
  ];
  const onSubmit = (data) => {
    console.log(data);
  };
  useEffect(() => {
    reset(dialogData);
  }, [dialogData, reset]);
  return (
    <div className="flex-1 h-screen">
      <Table head={head} />
      {isClose ? (
        <></>
      ) : (
        <Dialog
          dialogTitle="Thông tin sản phẩm"
          labelSubmit="Cập nhập sản phẩm"
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        >
          {head.map((value, index) => {
            if (value?.lable === "ID") {
              return (
                <InputDialog
                  key={index}
                  disabled={true}
                  label={value?.label}
                  register={register(value.name)}
                />
              );
            } else {
              return (
                <InputDialog
                  key={index}
                  hasDropdown={value?.hasDropdown}
                  name={value?.name}
                  type={value.type}
                  label={value?.label}
                  register={register(value.name)}
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
