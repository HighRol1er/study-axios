import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(function (config) {
  console.log("인터셉트 요청 성공");
  return config;
});

api.interceptors.response.use(
  function (response) {
    console.log("응답 받음");
    return response;
  },
  function (error) {
    console.log("인터셉트 에러", error);
    return Promise.reject(error);
  }
);

export default api;