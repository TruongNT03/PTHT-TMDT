import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";

const Row = ({ data = {} }) => {
  const { setIsClose, setDialogData } = useContext(ProductContext);
  return (
    <tr className="border-b-[1px] border-black border-opacity-20 h-12">
      {Object.keys(data).map((key, index) => {
        if (key === "image") {
          return (
            <td key={index} className="">
              <img
                src={`http://localhost:8080/${data[key]}`}
                alt=""
                className="h-11 w-11 object-cover rounded"
              />
            </td>
          );
        } else {
          return (
            <td
              key={index}
              className="max-w-[100px] pr-3 overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {data[key]?.name || data[key]}
            </td>
          );
        }
      })}
      <td>
        <button
          className="text-light hover:text-primary"
          onClick={() => {
            setDialogData(data);
            setIsClose((prev) => !prev);
          }}
        >
          Sửa
        </button>
      </td>
    </tr>
  );
};

export default Row;
