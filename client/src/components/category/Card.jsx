const Card = ({ title = "title" }) => {
  return (
    <div className="max-w-[285px]">
      <div className="w-full">
        <img
          src="https://product.hstatic.net/200000013792/product/layer_256_4639e0a9a3d944a996bca0086a4230a7_master.jpg"
          alt=""
          className="object-cover w-full rounded-tl-2xl rounded-tr-2xl"
        />
      </div>
      <div className="p-5 bg-white rounded-bl-2xl rounded-br-2xl">
        <div className="font-semibold">{title}</div>
        <div>26 items</div>
      </div>
    </div>
  );
};

export default Card;
