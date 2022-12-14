import axios from "axios";

export const LoginApi = async (data) => {
  const loginApi = "http://localhost:3999/login";
  return await axios.post(loginApi, data);
};

export const RegisterApi = async (data) => {
  const registerApi = "http://localhost:3999/register";
  return await axios.post(registerApi, data);
};

export const AllowJoin = async () => {
  const token = localStorage.getItem("token");
  const AllowJoin = "http://localhost:3999/allow";
  return await axios.get(AllowJoin, {
    headers: { "x-auth-token": token },
  });
};
