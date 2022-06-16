import axios, { AxiosRequestConfig } from "axios";

export default async function ApiServices({
  url,
  method,
  data,
  params,
}: AxiosRequestConfig) {
  const BASE_URL = process.env.NEXT_PUBLIC_API;

  let headers = {};
  headers = {
    Accept: "application/json",
  };

  const res = await axios({
    url: `${BASE_URL}/${url}`,
    method: method,
    data: data,
    params: params,
    headers: headers,
  })
    .then(function (response) {
      if (response.status == 200) {
        const result = {
          error: false,
          message: "",
          statusCode: 200,
          data: response.data,
        };

        return result;
      } else if (response.status == 204) {
        const result = {
          error: false,
          message: "",
          statusCode: 204,
          data: [],
        };

        return result;
      }
    })
    .catch(function (error) {
      const result = {
        error: true,
        message: "Try again, server not responding",
        statusCode: 500,
        data: null,
      };

      return result;
    });

  return res;
}
