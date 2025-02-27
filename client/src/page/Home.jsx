import Banner from "../components/banner/Banner";
import Section from "../components/section/Section";
import Service from "../components/service/Service";

const Home = () => {
  return (
    <div className="w-full">
      <Banner />
      <div className="w-full bg-secondary">
        <Service />
      </div>
      <div className="w-full bg-light">
        <Section />
      </div>
    </div>
  );
};

export default Home;
