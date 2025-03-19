const Row = ({ dataRow = {}, isCloseHandle }) => {
  return (
    <tr className="border-b-[1px] border-black border-opacity-20 max-h-11">
      {Object.keys(dataRow).map((key, index) => {
        if (key === "image") {
          return (
            <td key={index}>
              <img
                src={dataRow[key]}
                alt=""
                className="max-h-11 object-cover rounded"
              />
            </td>
          );
        } else {
          return (
            <td
              key={index}
              className="max-w-[100px] pr-3 overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {dataRow[key]?.name || dataRow[key]}
            </td>
          );
        }
      })}
      <td>
        <button
          className="text-light hover:text-primary"
          onClick={isCloseHandle}
        >
          Sửa
        </button>
      </td>
    </tr>
  );
};

export default Row;
