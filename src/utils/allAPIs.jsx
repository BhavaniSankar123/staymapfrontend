import axios from "axios";

const prod = {
  url: {
    API_BASE_URL: process.env.devURL,
  },
};

const dev = {
  url: {
    API_BASE_URL: process.env.prodURL,
  },
};

const config = process.env.NODE_ENV === "development" ? dev : prod;

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
  headers: { "Content-type": "application/json" },
});

export const allAPIs = {
  TestAPI,
};

function TestAPI() {
  return instance.get("/");
}
