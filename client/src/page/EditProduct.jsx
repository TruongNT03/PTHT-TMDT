import InputDialog from "../components/dialog/InputDialog";
import FileDialog from "../components/dialog/FileDialog";

const EditProduct = () => {
  return (
    <div className="w-full">
      <div className="px-[32px] flex gap-5">
        <div className="flex-[3] bg-white rounded-lg">
          <div className="p-10">
            <div className="text-xl font-semibold mb-10">Information</div>
            <InputDialog
              label={"Product Name"}
              placeholder={"Summer T-Shirt"}
              className={"mb-10"}
            />
            <InputDialog
              label={"Product Description"}
              placeholder={"Product Description"}
              className={""}
            />
            <div className="w-full h-[2px] bg-gray-light my-16"></div>
            <div className="text-xl font-semibold mb-10">Image</div>
            <div className="w-full h-[200px] border-[2px] border-gray-light rounded-md border-dashed">
              <FileDialog className={"w-full h-full my-auto"} />
            </div>
            <div className="w-full h-[2px] bg-gray-light my-16"></div>
            <div className="text-xl font-semibold mb-10">Price</div>
            <div className="flex gap-10">
              <InputDialog
                label={"Product Price"}
                placeholder={"Enter price"}
                className={""}
              />
              <InputDialog
                label={"Discount Price"}
                placeholder={"Price at Discount"}
                className={""}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-[1] gap-10">
          <div className="bg-white rounded-lg p-[32px] h-[300px] overflow-y-auto">
            <div className="font-semibold mb-5">Categories</div>
            <div className="flex gap-3 mb-3">
              <input type="checkbox" className="w-4" />
              <div className="">Label</div>
            </div>
            <div className="flex gap-3 mb-3">
              <input type="checkbox" className="w-4" />
              <div className="">Label</div>
            </div>
            <div className="flex gap-3 mb-3">
              <input type="checkbox" className="w-4" />
              <div className="">Label</div>
            </div>
            <div className="flex gap-3 mb-3">
              <input type="checkbox" className="w-4" />
              <div className="">Label</div>
            </div>
            <div className="flex gap-3 mb-3">
              <input type="checkbox" className="w-4" />
              <div className="">Label</div>
            </div>
            <div className="text-blue-500 cursor-pointer">Create New</div>
          </div>
          <div className="bg-white rounded-lg p-[32px] h-[300px] overflow-y-scroll">
            <div className="font-semibold mb-5">Section</div>
            <div className="flex gap-3 mb-3">
              <input type="checkbox" className="w-4" />
              <div className="">Label</div>
            </div>
            <div className="flex gap-3 mb-3">
              <input type="checkbox" className="w-4" />
              <div className="">Label</div>
            </div>
            <div className="flex gap-3 mb-3">
              <input type="checkbox" className="w-4" />
              <div className="">Label</div>
            </div>
            <div className="text-blue-500 cursor-pointer">Create New</div>
          </div>
        </div>
      </div>
      <div className="px-[32px] flex flex-col pb-10">
        <div className="w-full h-[2px] bg-gray-light my-16"></div>
        <div className="flex justify-end gap-3">
          <button className="w-[80px] h-[40px] border-[2px] rounded-lg border-gray-light text-blue-600 font-medium">
            Cancel
          </button>
          <button className="w-[80px] h-[40px] border-[2px] rounded-lg border-gray-light bg-blue-600 text-white font-medium">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
