import instance from "../../utils/axios";

const register = async ({ firstname, lastname, email, password }) => {
  try {
    const response = await instance.post("/auth/register", {
      firstname,
      lastname,
      email,
      password,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export default register;
