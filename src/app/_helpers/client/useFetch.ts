import { useRouter } from "next/navigation";

export default function useFetch() {
  const router = useRouter();

  function request(method: string) {
    return async (url: string, body?: any) => {
      const requestOptions: any = {
        method,
      };
      if (body) {
        requestOptions.headers = {
          "Content-Type": "application/json",
        };
        requestOptions.body = JSON.stringify(body);
      }
      const response = await fetch(url, requestOptions);
      return handleResponse(response);
    };
  }

  async function handleResponse(response: any) {
    const isJson = response.headers
      ?.get("content-type")
      ?.includes("application/json");

    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      if (response.status === 401) {
        router.push("/login");
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  }

  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
  };
}
