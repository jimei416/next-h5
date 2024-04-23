import FetchService from "@/http";
import { resType } from "@/type";

const fetchService = new FetchService();

const error = (err: any): resType => {
  return { type: "error", code: 0, message: err.message };
};

const notify = async (Data: { org_id: string }) => {
  const url = "/notify";

  try {
    const data = await fetchService.post(url, Data);
    return data;
  } catch (err) {
    return error(err);
  }
};

const postMes = async (Data: any) => {
  const url = "/postMes";

  try {
    const data = await fetchService.post(url, Data);
    return data;
  } catch (err) {
    return error(err);
  }
};

const postTab = async (Data: any) => {
  const url = "/postTab";

  try {
    const data = await fetchService.post(url, Data);
    return data;
  } catch (err) {
    return error(err);
  }
};

const getMes = async (Data: any) => {
  const url = "/getMes";

  try {
    const data = await fetchService.post(url, Data);
    return data;
  } catch (err) {
    return error(err);
  }
};

const tianMess = async (Data: any) => {
  const url = "/tianMess";

  try {
    const data = await fetchService.post(url, Data);
    return data;
  } catch (err) {
    return error(err);
  }
};

const tianTab = async (Data: any) => {
  const url = "/tianTab";

  try {
    const data = await fetchService.post(url, Data);
    return data;
  } catch (err) {
    return error(err);
  }
};

const getMess = async (Data: any) => {
  const url = "/getMess";

  try {
    const data = await fetchService.post(url, Data);
    return data;
  } catch (err) {
    return error(err);
  }
};

const getAnsPass = async (Data: any) => {
  const url = "/getAnsPass";

  try {
    const data = await fetchService.post(url, Data);
    return data;
  } catch (err) {
    return error(err);
  }
};

const down = async (Data: { filename: string }) => {
  const url = "/down";

  try {
    const data = await fetchService.post(url, Data);
    return data;
  } catch (err) {
    return error(err);
  }
};

export {
  getAnsPass,
  getMess,
  notify,
  postMes,
  postTab,
  getMes,
  tianMess,
  tianTab,
  down,
};
