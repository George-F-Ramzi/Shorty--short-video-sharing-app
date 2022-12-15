import axios from "axios";

export const LoginApi = async (data) => {
  const loginApi = "https://shorty-i6gt.onrender.com/login";
  return await axios.post(loginApi, data);
};

export const RegisterApi = async (data) => {
  const registerApi = "https://shorty-i6gt.onrender.com/register";
  return await axios.post(registerApi, data);
};

export const AllowJoin = async () => {
  const token = localStorage.getItem("token");
  const AllowJoin = "https://shorty-i6gt.onrender.com/allow";
  return await axios.get(AllowJoin, {
    headers: { "x-auth-token": token },
  });
};
