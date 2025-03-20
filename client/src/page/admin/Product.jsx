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
            disabled={true}
            hasDropdown={true}
            register={register}
            name={"id"}
            errors={errors}
          />
          <InputDialog
            label={"Name"}
            register={register}
            name={"name"}
            errors={errors}
          />
          <InputDialog
            label={"Description"}
            register={register}
            name={"description"}
            errors={errors}
          />
          <InputDialog
            label={"Price"}
            register={register}
            name={"price"}
            errors={errors}
          />
          <InputDialog
            label={"Stock"}
            register={register}
            name={"stock"}
            errors={errors}
          />
          <FileDialog
            label={"Image"}
            name={"image"}
            register={register}
            errors={errors}
          />
          <DropDownDialog
            label={"Subcategory"}
            name={"subCategory"}
            register={register}
            listDropDown={listSubCategory}
            errors={errors}
            setValue={setValue}
          />
          <DropDownDialog
            label={"Section"}
            name={"section"}
            register={register}
            listDropDown={listSection}
            errors={errors}
            setValue={setValue}
          />
        </Dialog>
      )}
    </div>
  );
};

export default Product;
