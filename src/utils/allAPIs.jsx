import axios from "axios";
import httpInterceptors from "./middleware";

const prod = {
  url: {
    API_BASE_URL: 'https://prod-apis.staymap.in/',
  },
};

const dev = {
  url: {
    API_BASE_URL: 'https://prod-apis.staymap.in/',
  },
};


const config = process.env.NODE_ENV === "development" ? dev : prod;

const apiClient = axios.create({
  baseURL: config.url.API_BASE_URL,
  timeout: 90000,
});

httpInterceptors(apiClient);

const request = ({
  method,
  url,
  data = {},
  params = {},
  preLogin = false,
  config = {},
}) =>
  apiClient({
    method,
    url,
    data,
    params,

    meta: { preLogin },
    ...config,
  }).then((res) => {
    return {
      data: res.data,
      status: res.status,
    };
  }).catch((err) => {
    console.error("Error from Axios", err);
    return {
      data: null,
      status: err.response?.status || 500,
    };
  });;


const allAPIs = {
  healthCheck: () => request({ method: "GET", url: "/", preLogin: true }),
  checkUserExistence: (data) => request({ method: "POST", url: "/users/checkUserExistence", data, preLogin: true }),
  createUser: (data) => request({ method: "POST", url: "/users/createUser", data, preLogin: true }),
  login: (data) => request({ method: "POST", url: "/auth/login", data, preLogin: true }),
  refreshToken: (data) => request({ method: "POST", url: "/auth/refreshToken", data }),
  logout: (data) => request({ method: "POST", url: "/auth/logout", data }),
  sendOTPForPasswordReset: (data) => request({ method: "POST", url: "/users/sendOTPForPasswordReset", data }),
  verifyOTPForPasswordReset: (data) => request({ method: "POST", url: "/users/verifyOTPForPasswordReset", data }),
  resetPassword: (data) => request({ method: "POST", url: "/users/resetPassword", data }),
  postPropertyByUser: (data) => request({ method: "POST", url: "/properties/postPropertyByUser", data }),
  requestSupport: (data) => request({ method: "POST", url: "/misc/requestSupport", data, preLogin: true }),
  getAboutUsData: (params) => request({ method: "GET", url: "/misc/getAboutUsData", params }),
  getVerifiedProperties: (params) => request({ method: "GET", url: "/properties/getVerifiedProperties", params }),
  getUserFavouriteProperties: (params) => request({ method: "GET", url: "/users/getUserFavouriteProperties", params }),
  getClientProperties: (params) => request({ method: "GET", url: "/users/getClientProperties", params }),
  toggleAddToFavourites: (data) => request({ method: "PUT", url: "/users/toggleAddToFavourites", data }),
  addToLogs: (data) => request({ method: "POST", url: "/misc/addToLogs", data }),

  adminLogin: (data) => request({ method: "POST", url: "/admin/login", data, preLogin: true }),
  adminLogout: (data) => request({ method: "POST", url: "/admin/login", data }),
  getPostedProperties: (params) => request({ method: "GET", url: "/admin/getPostedProperties", params }),
  updatePostedProperties: (data) => request({ method: "PUT", url: "/admin/updatePostedProperties", data }),
  postVerifiedProperty: (data) => request({ method: "PUT", url: "/admin/postVerifiedProperty", data }),
  getVerifiedPropertyDetailsById: (params) => request({ method: "GET", url: "/properties/getVerifiedPropertyDetailsById", params }),
  getSavedProperties: (params) => request({ method: "GET", url: "/admin/getSavedProperties", params }),
  getClientsData: (params) => request({ method: "GET", url: "/admin/getClientsData", params }),
  getSupportRequests: (params) => request({ method: "GET", url: "/admin/getSupportRequests", params }),
  verifyAsTestimonial: (data) => request({ method: "PUT", url: "/admin/verifyAsTestimonial", data }),
};

export default allAPIs;
