import FetchService from "@/http";
import { resType } from "@/type";
interface user {
  name: string;
  phone?: string;
  password: string;
}
const fetchService = new FetchService();

const error = (err: any): resType => {
  return { type: "error", code: 0, message: err.message };
};

const userLogin = async (userData: user) => {
  const url = "/login";

  try {
    const data = await fetchService.post(url, userData);
    return data;
  } catch (err) {
    return error(err);
  }
};

const userRegister = async (userData: user) => {
  const url = "/register";

  try {
    const data = await fetchService.post(url, userData);
    console.log(data);
    return data;
  } catch (err) {
    return error(err);
  }
};

const gettime = async () => {
  const url = "/getTime";

  try {
    const data = await fetchService.get(url);
    console.log(data);
    return data;
  } catch (err) {
    return error(err);
  }
};
const getUser = async () => {
  const url = "/getUser";

  try {
    const data = await fetchService.get(url);
    return data;
  } catch (err) {
    return error(err);
  }
};

export { userLogin, userRegister, gettime, getUser };
