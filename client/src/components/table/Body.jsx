import Row from "./Row";

const Body = ({ data, isCloseHandle }) => {
  return (
    <tbody>
      {data?.map((dataRow, index) => {
        return (
          <Row key={index} dataRow={dataRow} isCloseHandle={isCloseHandle} />
        );
      })}
    </tbody>
  );
};

export default Body;
