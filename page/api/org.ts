import FetchService from "@/http";
import { resType } from "@/type";

const fetchService = new FetchService();

const error = (err: any): resType => {
  return { type: "error", code: 0, message: err.message };
};

const getUserOrg = async () => {
  const url = "/getUserOrg";
  try {
    const data = await fetchService.get(url);
    return data;
  } catch (err) {
    return error(err);
  }
};

const createOrg = async (orgData: {
  name: string;
  type: string;
  introduce: string;
}) => {
  const url = "/createOrg";
  try {
    const data = await fetchService.post(url, orgData);
    return data;
  } catch (err) {
    return error(err);
  }
};

const queryOrg = async (JoinData: { id: string; name: string }) => {
  const url = "/queryOrg";
  try {
    const data = await fetchService.post(url, JoinData);
    return data;
  } catch (err) {
    return error(err);
  }
};

const queryUserOrg = async (JoinData: { name: string }) => {
  const url = "/queryUserOrg";
  try {
    const data = await fetchService.post(url, JoinData);
    return data;
  } catch (err) {
    return error(err);
  }
};

const joinOrg = async (Data: { org_id: string }) => {
  const url = "/joinOrg";
  try {
    const data = await fetchService.post(url, Data);
    return data;
  } catch (err) {
    return error(err);
  }
};

const selOrgUser = async (Data: { org_id: string }) => {
  const url = "/selOrgUser";
  try {
    const data = await fetchService.post(url, Data);
    return data;
  } catch (err) {
    return error(err);
  }
};

const selApp = async (Data: { org_id: string }) => {
  const url = "/selApp";
  try {
    const data = await fetchService.post(url, Data);
    return data;
  } catch (err) {
    return error(err);
  }
};

const changeApp = async (Data: any) => {
  const url = "/changeApp";
  try {
    const data = await fetchService.post(url, Data);
    return data;
  } catch (err) {
    return error(err);
  }
};

const delOrgUser = async (Data: any) => {
  const url = "/delOrgUser";
  try {
    const data = await fetchService.post(url, Data);
    return data;
  } catch (err) {
    return error(err);
  }
};
export {
  selApp,
  getUserOrg,
  createOrg,
  queryOrg,
  joinOrg,
  queryUserOrg,
  selOrgUser,
  changeApp,
  delOrgUser,
};
