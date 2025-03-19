import { IoIosArrowForward } from "react-icons/io";

const Direction = () => {
  const direction = ["Home", "Order List", "Order Details"];
  return (
    <div className="ml-8 my-4 bg-transparent">
      <div className="text-xl font-semibold mb-3">Product</div>
      <div className="flex font-medium text-black text-opacity-50">
        {direction.map((item, index) => {
          if (index === direction.length - 1) {
            return (
              <div
                key={index}
                className="text-black text-opacity-50 hover:text-opacity-100 cursor-pointer"
              >
                {item}
              </div>
            );
          } else {
            return (
              <div key={index} className="flex items-center">
                <div className="text-black text-opacity-50 hover:text-opacity-100 cursor-pointer">
                  {item}
                </div>
                <IoIosArrowForward />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Direction;
