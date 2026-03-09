import axios from "axios";

/* ---------- Axios Instance ---------- */

export const axiosInstance = axios.create({});

/* ---------- API Connector ---------- */

export const apiConnector = (method, url, bodyData = null, headers = null, params = null) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
  });
};