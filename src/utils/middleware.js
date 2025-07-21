
const httpInterceptors = (client) => {
  client.interceptors.request.use((config) => {
    const isPreLogin = config.meta?.preLogin;

    if (!isPreLogin) {
      const accessToken = localStorage.getItem("accessToken");
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || user?._id; 
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        config.headers["userId"] = userId;
      }
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn("Unauthorized request");
      }
      return Promise.reject(error);
    }
  );
};

export default httpInterceptors;  