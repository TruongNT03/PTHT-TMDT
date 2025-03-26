import { useState, useEffect } from "react";

import Banner from "../components/banner/Banner";
import Card from "../components/card/Card";
import Section from "../components/section/Section";
import Service from "../components/service/Service";
import { getAllProduct } from "../services/productService/getAllProduct";
import Loading from "../components/loading/Loading";

const Home = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const response = await getAllProduct();
      setData(response.data);
    };
    getData();
  }, []);
  return (
    <div className="w-full">
      <Banner />
      <div className="w-full bg-secondary">
        <Service />
      </div>
      <div className="w-full bg-light">
        {data ? (
          <Section>
            {data.map((value, index) => (
              <Card
                key={index}
                image={process.env.REACT_APP_SERVER_URL + value.image}
                data={value}
              />
            ))}
          </Section>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Home;
