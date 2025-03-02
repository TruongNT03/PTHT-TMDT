import instance from "../../utils/axios";

const register = async ({ firstName, lastName, email, password }) => {
  try {
    const response = await instance.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export default register;
