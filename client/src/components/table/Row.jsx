import { Link } from "react-router-dom";

const Row = ({ data = {} }) => {
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
        <Link
          to={`/admin/product/edit/${data.id}`}
          className="text-light hover:text-primary"
        >
          Sửa
        </Link>
      </td>
      <td>
        <button className="text-red-500">Xóa</button>
      </td>
    </tr>
  );
};

export default Row;
