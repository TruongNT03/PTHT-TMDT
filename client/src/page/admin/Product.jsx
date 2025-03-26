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
import insertProduct from "../../services/productService/insertProduct";
import Modal from "../../components/Modal";
import Loading from "../../components/loading/Loading";

const Product = () => {
  const { dialogData, getData, visible, loading, setVisible } =
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
  const onSubmit = async (data) => {
    let content = { "Content-Type": "application/json" };
    if (typeof data?.image === "object") {
      const listFile = data.image;
      data = { ...data, image: listFile[0] };
      content = { "Content-Type": "multipart/form-data" };
    } else {
      delete data.image;
    }
    let response;
    if (data?.id === "") {
      delete data.id;
      response = await insertProduct(data, content);
    } else {
      response = await updateProduct(data, content);
    }
    if (!response.errors) {
      alert(response.message);
      setVisible(true);
      getData();
    }
  };
  useEffect(() => {
    reset(dialogData);
  }, [dialogData, reset]);
  return (
    <div className="flex-1 h-screen">
      {loading ? (
        <Loading />
      ) : (
        <TableContainer head={head} title="Recent purchases" />
      )}

      {/* <Modal visible={visible}>
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
                value: /^[\p{L}0-9 ,.!?@#$%^&*()_+\-=[\]{};':"<>\/]+$/u,
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
                value: /^[\p{L}0-9 ,.!?@#$%^&*()_+\-=[\]{};':"<>\/]+$/u,
                message: "Không hợp lệ",
              },
            })}
            name={"description"}
            error={errors?.description?.message}
          />
          <InputDialog
            label={"Price"}
            register={register("price", {
              valueAsNumber: true,
              pattern: { value: /^-?\d+(\.\d+)?$/, message: "Không hợp lệ" },
            })}
            name={"price"}
            error={errors?.price?.message}
          />
          <InputDialog
            label={"Stock"}
            register={register("stock", {
              valueAsNumber: true,
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
            register={register("subCategoryId", {
              valueAsNumber: true,
            })}
            listDropDown={listSubCategory}
            error={errors?.subCategory?.message}
          />
          <DropDownDialog
            label={"Section"}
            register={register("sectionId", {
              valueAsDate: true,
            })}
            listDropDown={listSection}
            error={errors?.section?.message}
          />
        </Dialog>
      </Modal> */}
    </div>
  );
};

export default Product;
