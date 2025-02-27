import Slider from "react-slick";

const Banner = () => {
  var settings = {
    adaptiveHeight: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "5px",
          width: "100%",
        }}
      >
        <ul className="custom-dots">{dots}</ul>
      </div>
    ),
  };
  return (
    <div className="w-full object-scale-down">
      <Slider {...settings}>
        <img
          src="https://bizweb.dktcdn.net/100/455/315/themes/894917/assets/slider_2.jpg?1724746453440"
          alt=""
          className=""
        />
        <img
          src="https://bizweb.dktcdn.net/100/455/315/themes/894917/assets/slider_2.jpg?1724746453440"
          alt=""
          className=""
        />
      </Slider>
    </div>
  );
};

export default Banner;
