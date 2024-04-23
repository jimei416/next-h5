import { resType } from "@/type";

const loc = "http://localhost:4416";
// const loc = "http://192.168.5.47:4416";

const token = () => {
  const tok = localStorage.getItem("token");
  return tok ? tok : "";
};

class FetchService {
  async get(url: string): Promise<resType> {
    const res = await fetch(loc.concat(url), {
      method: "GET",
      headers: {
        Authorization: token(),
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    return data;
  }
  async post(url: string, body: any): Promise<resType> {
    const res = await fetch(loc.concat(url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token(),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    return data;
  }
}
export default FetchService;
