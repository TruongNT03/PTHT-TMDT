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
      <Slider {...settings} autoplay={true} autoplaySpeed={3000}>
        <img
          src="https://bizweb.dktcdn.net/100/455/315/themes/894917/assets/slider_2.jpg?1724746453440"
          alt=""
          className="max-h-[700px] object-cover"
        />
        <img
          src="https://cdn.printnetwork.com/production/assets/5966561450122033bd4456f8/imageLocker/blog-description/blog/sales_banners.jpg"
          alt=""
          className="max-h-[700px] object-cover"
        />
        <img
          src="https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"
          alt=""
          className="max-h-[700px] object-cover"
        />
      </Slider>
    </div>
  );
};

export default Banner;
