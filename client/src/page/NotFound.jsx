import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white w-screen h-screen flex flex-col items-center justify-center">
      <img
        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
        alt=""
        className=""
      />
      <div
        className="bg-primary rounded-xl p-3 text-white hover:bg-secondary bg-opacity-80 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home
      </div>
    </div>
  );
};

export default NotFound;
