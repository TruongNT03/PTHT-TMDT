import { IoCloseOutline } from "react-icons/io5";
import Button from "../button/Button";
import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";

const Dialog = ({
  onSubmit,
  handleSubmit,
  labelSubmit = "",
  dialogTitle = "",
  children,
}) => {
  const { setIsClose } = useContext(ProductContext);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-md relative">
        <form action="" className="w-[600px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="uppercase font-bold">{dialogTitle}</div>
          <IoCloseOutline
            className="absolute top-3 right-3 cursor-pointer"
            fontSize={32}
            onClick={() => {
              setIsClose((prev) => !prev);
            }}
          />
          <div className="h-[1px] w-full bg-dark my-8"></div>
          {children}
          <div className="flex justify-end">
            <Button
              label={"Hủy"}
              variant="white"
              className={"w-[60px] h-10 mr-5 rounded-none"}
              type="button"
              onClick={() => {
                setIsClose((prev) => !prev);
              }}
            />
            <Button
              label={labelSubmit}
              className={"w-[200px] h-10 rounded-none"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dialog;
