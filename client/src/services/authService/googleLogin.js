import instance from "../../utils/axios";

const googleLogin = async () => {
  instance.get("/auth/google");
};

export default googleLogin;
