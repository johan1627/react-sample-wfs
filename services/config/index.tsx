import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

interface ApiServicesProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}

export default async function ApiServices({
  url,
  method,
  data,
  params,
  token,
  serverToken,
}: ApiServicesProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_API;

  let headers = {};

  if (serverToken) {
    // Server Side
    headers = {
      Accept: "application/json",
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    // Side Side
    // const tokenFromCookies = "11200|BQmpPkQ1pLt9SOlkJVOL1QWWrPpc0IZ8k3CXXZ03";
    const tokenFromCookies = Cookies.get("mhr-token");

    headers = {
      Accept: "application/json",
      Authorization: `Bearer ${tokenFromCookies}`,
    };
  } else {
    headers = {
      Accept: "application/json",
    };
  }

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
          message: response.data.meta.message,
          statusCode: 200,
          data: response.data.data,
        };

        return result;
      } else if (response.status == 204) {
        const result = {
          error: false,
          message: response.data.meta.message,
          statusCode: 204,
          data: [],
        };

        return result;
      }
    })
    .catch(function (error) {
      const respo = error.response;

      if (respo.status == 400) {
        const result = {
          error: true,
          message: respo.data.data.message,
          statusCode: 400,
          data: null,
        };
        return result;
      } else if (respo.status == 401) {
        const result = {
          error: true,
          message: "Unauthenticated",
          statusCode: 401,
          data: null,
        };
        return result;
      } else if (respo.status == 422) {
        const errorLength = respo.data.errors.length;
        var dataError;
        if (errorLength > 0) {
          dataError = respo.data.errors;
        } else {
          dataError = [];
        }

        const result = {
          error: true,
          message: "Validation failed",
          statusCode: 422,
          data: dataError,
        };
        return result;
      } else {
        const result = {
          error: true,
          message: "Try again, server not responding",
          statusCode: 500,
          data: null,
        };

        return result;
      }
    });

  return res;
}
