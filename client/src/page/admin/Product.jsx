import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Dialog from "../../components/dialog/Dialog";
import TableContainer from "../../components/table/TableContainer";
import InputDialog from "../../components/dialog/InputDialog";
import { ProductContext } from "../../contexts/ProductContext";
import DropDownDialog from "../../components/dialog/DropDownDialog";
import getAllDropDown from "../../services/productService/getAllDropDown";
import FileDialog from "../../components/dialog/FileDialog";
import updateProduct from "../../services/productService/updateProduct";

const Product = () => {
  const { dialogData, isClose, setIsClose, getData } =
    useContext(ProductContext);
  const [listSubCategory, setSubCategory] = useState([]);
  const [listSection, setListSection] = useState([]);
  useEffect(() => {
    const handle = async () => {
      const subcategories = await getAllDropDown("subcategory");
      const sections = await getAllDropDown("section");
      setListSection(sections.data);
      setSubCategory(subcategories.data);
    };
    handle();
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({ values: dialogData });
  const head = [
    "ID",
    "Name",
    "Description",
    "Price",
    "Stock",
    "Image",
    "Subcategory",
    "Section",
  ];
  const onSubmit = async (body) => {
    const listFile = body?.image;
    body = { ...body, image: listFile[0] };
    const responese = await updateProduct(body);
    if (!responese.errors) {
      alert(responese.message);
      setIsClose(true);
      getData();
    }
  };
  useEffect(() => {
    reset(dialogData);
  }, [dialogData, reset]);
  return (
    <div className="flex-1 h-screen">
      <TableContainer head={head} title="Recent purchases" />
      {isClose ? (
        <></>
      ) : (
        <Dialog
          dialogTitle="Thông tin sản phẩm"
          labelSubmit="Cập nhập sản phẩm"
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        >
          <InputDialog
            label={"ID"}
            readOnly={true}
            register={register("id")}
            error={errors?.id?.message}
          />
          <InputDialog
            label={"Name"}
            register={register("name", {
              pattern: {
                value: /^[\p{L}0-9 ,.!?@#\$%^&*()_+-=\[\]{};':"<>\/]+$/u,
                message: "Không hợp lệ",
              },
              required: true,
            })}
            error={errors?.name?.message}
          />
          <InputDialog
            label={"Description"}
            register={register("description", {
              pattern: {
                value: /^[\p{L}0-9 ,.!?@#\$%^&*()_+-=\[\]{};':"<>\/]+$/u,
                message: "Không hợp lệ",
              },
            })}
            name={"description"}
            error={errors?.description?.message}
          />
          <InputDialog
            label={"Price"}
            register={register("price", {
              pattern: { value: /^-?\d+(\.\d+)?$/, message: "Không hợp lệ" },
            })}
            name={"price"}
            error={errors?.price?.message}
          />
          <InputDialog
            label={"Stock"}
            register={register("stock", {
              pattern: { value: /^[1-9]\d*$/, message: "Không hợp lệ" },
            })}
            name={"stock"}
            error={errors?.stock?.message}
          />
          <FileDialog
            label={"Image"}
            name={"image"}
            register={register("image")}
            error={errors?.image?.message}
          />
          <DropDownDialog
            label={"Subcategory"}
            name={"subCategory"}
            register={register("subCategory")}
            listDropDown={listSubCategory}
            error={errors?.subCategory?.message}
            setValue={setValue}
          />
          <DropDownDialog
            label={"Section"}
            name={"section"}
            register={register("section")}
            listDropDown={listSection}
            error={errors?.section?.message}
            setValue={setValue}
          />
        </Dialog>
      )}
    </div>
  );
};

export default Product;
