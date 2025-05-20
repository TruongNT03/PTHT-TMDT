import { useState, useEffect, useContext } from "react";

import Banner from "../components/banner/Banner";
import Card from "../components/card/Card";
import Section from "../components/section/Section";
import Service from "../components/service/Service";
import getAllProduct from "../services/productService/getAllProduct";
import Loading from "../components/loading/Loading";
import { LoadingContext } from "../contexts/LoadingContext";

const Home = () => {
  const [data, setData] = useState();
  const { setLoading } = useContext(LoadingContext);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await getAllProduct();
      setData(response?.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
                image={value?.product_images[0]?.path}
                data={value}
              />
            ))}
          </Section>
        ) : (
          <Loading />
        )}
        {data ? (
          <Section>
            {data.map((value, index) => (
              <Card
                key={index}
                image={value?.product_images[0]?.path}
                data={value}
              />
            ))}
          </Section>
        ) : (
          <Loading />
        )}
        {data ? (
          <Section>
            {data.map((value, index) => (
              <Card
                key={index}
                image={value?.product_images[0]?.path}
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
