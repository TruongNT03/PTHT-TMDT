import { useContext } from "react";

import Row from "./Row";
import { ProductContext } from "../../contexts/ProductContext";

const Body = () => {
  const { data } = useContext(ProductContext);
  return (
    <tbody>
      {data?.data?.map((value, index) => {
        return <Row key={index} data={value} />;
      })}
    </tbody>
  );
};

export default Body;
