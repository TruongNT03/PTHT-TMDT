// import { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// import Dialog from "../../components/dialog/Dialog";
// import TableContainer from "../../components/table/TableContainer";
// import InputDialog from "../../components/dialog/InputDialog";
// import { ProductContext } from "../../contexts/ProductContext";
// import DropDownDialog from "../../components/dialog/DropDownDialog";
// import getAllDropDown from "../../services/productService/getAllDropDown";
// import FileDialog from "../../components/dialog/FileDialog";
// import updateProduct from "../../services/productService/updateProduct";
// import insertProduct from "../../services/productService/insertProduct";
// import Modal from "../../components/Modal";
// import Loading from "../../components/loading/Loading";

// const Product = () => {
//   const { dialogData, getData, visible, loading, setVisible } =
//     useContext(ProductContext);
//   const [listSubCategory, setSubCategory] = useState([]);
//   const [listSection, setListSection] = useState([]);
//   useEffect(() => {
//     const handle = async () => {
//       const subcategories = await getAllDropDown("subcategory");
//       const sections = await getAllDropDown("section");
//       setListSection(sections.data);
//       setSubCategory(subcategories.data);
//     };
//     handle();
//   }, []);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({ values: dialogData });
//   const head = [
//     "ID",
//     "Name",
//     "Description",
//     "Price",
//     "Stock",
//     "Image",
//     "Subcategory",
//     "Section",
//   ];
//   const onSubmit = async (data) => {
//     let content = { "Content-Type": "application/json" };
//     if (typeof data?.image === "object") {
//       const listFile = data.image;
//       data = { ...data, image: listFile[0] };
//       content = { "Content-Type": "multipart/form-data" };
//     } else {
//       delete data.image;
//     }
//     let response;
//     if (data?.id === "") {
//       delete data.id;
//       response = await insertProduct(data, content);
//     } else {
//       response = await updateProduct(data, content);
//     }
//     if (!response.errors) {
//       alert(response.message);
//       setVisible(true);
//       getData();
//     }
//   };
//   useEffect(() => {
//     reset(dialogData);
//   }, [dialogData, reset]);
//   return (
//     <div className="flex-1 h-screen">
//       {loading ? (
//         <Loading />
//       ) : (
//         <TableContainer head={head} title="Recent purchases" />
//       )}

//       {/* <Modal visible={visible}>
//         <Dialog
//           dialogTitle="Thông tin sản phẩm"
//           labelSubmit="Cập nhập sản phẩm"
//           handleSubmit={handleSubmit}
//           onSubmit={onSubmit}
//         >
//           <InputDialog
//             label={"ID"}
//             readOnly={true}
//             register={register("id")}
//             error={errors?.id?.message}
//           />
//           <InputDialog
//             label={"Name"}
//             register={register("name", {
//               pattern: {
//                 value: /^[\p{L}0-9 ,.!?@#$%^&*()_+\-=[\]{};':"<>\/]+$/u,
//                 message: "Không hợp lệ",
//               },
//               required: true,
//             })}
//             error={errors?.name?.message}
//           />
//           <InputDialog
//             label={"Description"}
//             register={register("description", {
//               pattern: {
//                 value: /^[\p{L}0-9 ,.!?@#$%^&*()_+\-=[\]{};':"<>\/]+$/u,
//                 message: "Không hợp lệ",
//               },
//             })}
//             name={"description"}
//             error={errors?.description?.message}
//           />
//           <InputDialog
//             label={"Price"}
//             register={register("price", {
//               valueAsNumber: true,
//               pattern: { value: /^-?\d+(\.\d+)?$/, message: "Không hợp lệ" },
//             })}
//             name={"price"}
//             error={errors?.price?.message}
//           />
//           <InputDialog
//             label={"Stock"}
//             register={register("stock", {
//               valueAsNumber: true,
//               pattern: { value: /^[1-9]\d*$/, message: "Không hợp lệ" },
//             })}
//             name={"stock"}
//             error={errors?.stock?.message}
//           />
//           <FileDialog
//             label={"Image"}
//             name={"image"}
//             register={register("image")}
//             error={errors?.image?.message}
//           />
//           <DropDownDialog
//             label={"Subcategory"}
//             register={register("subCategoryId", {
//               valueAsNumber: true,
//             })}
//             listDropDown={listSubCategory}
//             error={errors?.subCategory?.message}
//           />
//           <DropDownDialog
//             label={"Section"}
//             register={register("sectionId", {
//               valueAsDate: true,
//             })}
//             listDropDown={listSection}
//             error={errors?.section?.message}
//           />
//         </Dialog>
//       </Modal> */}
//     </div>
//   );
// };

// export default Product;

import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spin, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import getAllProduct from "../../services/productService/getAllProduct";
const { Search } = Input;
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (description) => (
      <div className="max-w-[400px] overflow-hidden truncate ">
        {description}
      </div>
    ),
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Category",
    dataIndex: ["category", "name"],
    key: "category",
  },
  {
    title: "Section",
    dataIndex: ["section", "name"],
    key: "section",
  },
  {
    title: "Images",
    dataIndex: ["product_images"],
    key: "images",
    render: (images) =>
      images?.length > 0 ? (
        <img
          src={process.env.REACT_APP_SERVER_URL + images[0].path}
          alt="Ảnh sản phẩm"
          style={{
            width: 30,
            height: 30,
            objectFit: "cover",
            borderRadius: "3px",
          }}
        />
      ) : (
        "Không có ảnh"
      ),
  },
  {
    title: "Action",
    dataIndex: "id",
    key: "id",
    render: (value) => (
      <div className="flex gap-3">
        <Link to={`/admin/product/edit/${value}`} className="text-blue-500">
          Sửa
        </Link>
        <Link className="text-red">Xóa</Link>
      </div>
    ),
  },
];

const Product = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const response = await getAllProduct();
      setData(response.data);
    };
    getData();
  }, []);
  return (
    <div className="w-full mt-5">
      <div className="w-full px-8">
        <div className="text-2xl font-semibold">Product</div>
        <div className="flex justify-between items-center">
          <Search className="w-[500px] my-5" />
          <Link to={"/admin/product/new"}>
            <Button type="primary">Create new</Button>
          </Link>
        </div>
        {data ? (
          <Table
            dataSource={data}
            columns={columns}
            size="middle"
            className="bg-white rounded-xl p-5"
          />
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

export default Product;
