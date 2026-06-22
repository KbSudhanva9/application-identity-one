import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

  // Request interceptor
  api.interceptors.request.use(
    (config) => {

      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;

    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  api.interceptors.response.use(

    (response) => response,

    (error) => {

      const status = error.response?.status;

      const requestUrl = error.config?.url;

      if (status === 401) {

        // Don't redirect for SSO exchange failure
        if (
          requestUrl?.includes("/auth/session/exchange")
        ) {
          return Promise.reject(error);
        }

        // avoid infinite redirect loop
        const currentPath = window.location.pathname;

        if (currentPath !== "/") {

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          window.location.replace("/");
        }
      }
      return Promise.reject(error);
    }
  );

export default api;











// import axios from 'axios';

// // Create a configured instance of Axios
// // If you set up the Vite proxy from the previous step, use '/api' as baseURL.
// // Otherwise, use 'http://localhost:8080'
// const api = axios.create({
//   baseURL: '/api', 
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // 1. Request Interceptor: Inject the access token into every outgoing call
// api.interceptors.request.use(
//   (config) => {
//     // Match the key name you used during login
//     const token = localStorage.getItem('accessToken'); 
    
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 2. Response Interceptor: Catch global errors (like 401 Unauthorized)
// api.interceptors.response.use(
//   (response) => response, // Pass through successful responses
//   (error) => {
//     // If backend returns 401, token is invalid or expired
//     if (error.response && error.response.status === 401) {
//       localStorage.clear(); // Clear bad tokens
//       window.location.href = '/'; // Force redirect to login screen
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
