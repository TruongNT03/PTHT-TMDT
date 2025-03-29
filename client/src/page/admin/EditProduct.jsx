// import { useParams } from "react-router";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Select } from "antd";

// import InputDialog from "../../components/dialog/InputDialog";
// import FileDialog from "../../components/dialog/FileDialog";
// import TextArea from "../../components/dialog/TextArea";
// import getProductById from "../../services/productService/getProductById";
// import getAllDropDown from "../../services/productService/getAllDropDown";
// import insertProduct from "../../services/productService/insertProduct";

// const EditProduct = () => {
//   const [data, setData] = useState({});
//   const [size, setSize] = useState("s");
//   const [color, setColor] = useState("white");
//   const [categories, setCategories] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [category_id, setCategory_id] = useState();
//   const [section_id, setSection_id] = useState();
//   const { id } = useParams();
//   const { register, handleSubmit } = useForm({ values: data });
//   const notify = () =>
//     toast.success("Lưu sản phầm thành công", {
//       position: "top-right",
//       autoClose: 2000,
//       hideProgressBar: false,
//       pauseOnHover: false,
//       closeOnClick: false,
//       theme: "light",
//     });
//   const onSubmit = (data) => {
//     notify();
//     const product = {
//       name: data.name,
//       description: data.description,
//       // image: data.product_image,
//       category_id,
//       section_id,
//       variant_product: {
//         price: data.price,
//         old_price: data.old_price,
//         stock: data.stock,
//         // variant_image: data.variant_image,
//         variant: [{ size }, { color }],
//       },
//     };

//     const uploadProduct = async (product) => {
//       const response = await insertProduct(product);
//       console.log(response);
//     };
//     uploadProduct(product);
//   };
//   const sizeOption = [
//     {
//       value: "s",
//       label: "S",
//     },
//     {
//       value: "m",
//       label: "M",
//     },
//     {
//       value: "l",
//       label: "L",
//     },
//     {
//       value: "xl",
//       label: "XL",
//     },
//   ];
//   const colorOption = [
//     {
//       value: "white",
//       label: "White",
//     },
//     {
//       value: "black",
//       label: "Black",
//     },
//     {
//       value: "gray",
//       label: "Gray",
//     },
//     {
//       value: "cream",
//       label: "Cream",
//     },
//   ];
//   const sizeOnChange = (value) => {
//     setSize(value);
//   };
//   const colorOnChange = (value) => {
//     setColor(value);
//   };
//   useEffect(() => {
//     const getData = async (id) => {
//       const response = await getProductById(id);
//       setData(response.data);
//     };
//     const getList = async () => {
//       const categoryList = await getAllDropDown("category");
//       const sectionList = await getAllDropDown("section");
//       setCategories(categoryList.data);
//       setSections(sectionList.data);
//     };
//     getList();
//     if (id) {
//       getData(id);
//     }
//   }, [id]);
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full">
//       <ToastContainer />
//       <div className="px-[32px] flex gap-5">
//         <div className="flex-[3] bg-white rounded-lg">
//           <div className="p-10">
//             <div className="text-xl font-semibold mb-10">Information</div>
//             <InputDialog
//               label={"Product Name"}
//               placeholder={"Summer T-Shirt"}
//               className={"mb-10"}
//               register={register("name")}
//             />
//             <TextArea
//               label={"Product Description"}
//               placeholder={"Product Description"}
//               className={"h-[300px]"}
//               register={register("description")}
//             />
//             <div className="w-full h-[2px] bg-gray-light my-16"></div>
//             <div className="text-xl font-semibold mb-10">Image</div>
//             <div className="w-full h-[200px] border-[2px] border-gray-light rounded-md border-dashed">
//               <FileDialog
//                 multiple={true}
//                 className={"w-full h-full my-auto"}
//                 register={register("product_image")}
//               />
//             </div>
//             <div className="w-full h-[2px] bg-gray-light my-16"></div>
//             <div className="text-xl font-semibold mb-10">Details</div>
//             <div className="flex gap-10">
//               <InputDialog
//                 label={"Discount Price"}
//                 placeholder={"Price at Discount"}
//                 className={""}
//                 register={register("old_price")}
//               />
//               <InputDialog
//                 label={"Product Price"}
//                 placeholder={"Enter price"}
//                 className={""}
//                 register={register("price")}
//               />
//               <InputDialog
//                 label={"Stock"}
//                 placeholder={"Enter stock"}
//                 className={""}
//                 register={register("stock")}
//               />
//             </div>
//             <div className="flex gap-10">
//               <div className="flex-[1] flex flex-col gap-5">
//                 <div className="">
//                   <label htmlFor="size" className="text-gray">
//                     Size
//                   </label>
//                   <Select
//                     id="size"
//                     onChange={sizeOnChange}
//                     className="w-full"
//                     placeholder="Select a size"
//                     optionFilterProp="label"
//                     options={sizeOption}
//                   />
//                 </div>
//                 <div className="">
//                   <label htmlFor="size" className="text-gray">
//                     Color
//                   </label>
//                   <Select
//                     id="size"
//                     onChange={colorOnChange}
//                     className="w-full"
//                     placeholder="Select a color"
//                     optionFilterProp="label"
//                     options={colorOption}
//                   />
//                 </div>
//               </div>
//               <div className="flex-[1] border-[2px] border-gray-light rounded-md border-dashed">
//                 <FileDialog
//                   className={"w-full h-full my-auto"}
//                   register={register("variant_image")}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col flex-[1] gap-10">
//           <div className="bg-white rounded-lg p-[32px] h-[300px] overflow-y-auto">
//             <div className="font-semibold mb-5">Categories</div>
//             {categories.map((value, index) => (
//               <div key={index} className="flex gap-3 mb-3">
//                 <input
//                   type="radio"
//                   name="category"
//                   className="w-4"
//                   onClick={() => setCategory_id(value.id)}
//                 />
//                 <div className="">{value.name}</div>
//               </div>
//             ))}
//             <div className="text-blue-500 cursor-pointer">Create New</div>
//           </div>
//           <div className="bg-white rounded-lg p-[32px] h-[300px] overflow-y-scroll">
//             <div className="font-semibold mb-5">Section</div>
//             {sections.map((value, index) => (
//               <div key={index} className="flex gap-3 mb-3">
//                 <input
//                   type="radio"
//                   name="section"
//                   className="w-4"
//                   onClick={() => setSection_id(value.id)}
//                 />
//                 <div className="">{value.name}</div>
//               </div>
//             ))}
//             <div className="text-blue-500 cursor-pointer">Create New</div>
//           </div>
//         </div>
//       </div>
//       <div className="px-[32px] flex flex-col pb-10">
//         <div className="w-full h-[2px] bg-gray-light my-16"></div>
//         <div className="flex justify-end gap-3">
//           <button className="w-[80px] h-[40px] border-[2px] rounded-lg border-gray-light text-blue-600 font-medium">
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="w-[80px] h-[40px] border-[2px] rounded-lg border-gray-light bg-blue-600 text-white font-medium"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default EditProduct;

import { Form, Input, Row, Col, Select, Upload, Radio } from "antd";

const { Option } = Select;

const EditProduct = () => {
  return (
    <div className="w-full">
      <div className="p-8">
        <Form
          className="w-full p-8 bg-white shadow-xl rounded-xl"
          layout="vertical"
        >
          <div className="text-2xl font-semibold mb-5">Product Information</div>
          <div className="flex gap-10">
            <div className="flex-[3]">
              <Form.Item label="Product Name:">
                <Input></Input>
              </Form.Item>
            </div>
            <div className="flex-[1]">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <Form.Item label="Category:">
                  <Radio.Group>
                    <Row>
                      <Radio>1</Radio>
                    </Row>
                    <Row>
                      <Radio>1</Radio>
                    </Row>
                    <Row>
                      <Radio>1</Radio>
                    </Row>
                    <Row>
                      <Radio>1</Radio>
                    </Row>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;
