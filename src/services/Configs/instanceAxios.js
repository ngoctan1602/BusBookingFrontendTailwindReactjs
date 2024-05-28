import axios from "axios";

const createAxiosInstance = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL || "https://localhost:5107/api/",
        timeout: 10000, // 10 seconds timeout
    });

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            console.error("Request error:", error);
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => response.data,
        async (error) => {
            if (!error.response) {
                console.error("Network/Server error:", error);
                alert("Network error, please try again later.");
                return Promise.reject(error);
            }

            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = localStorage.getItem("refreshToken");
                if (refreshToken) {
                    try {
                        const response = await axios.post(
                            process.env.REACT_APP_REFRESH_TOKEN_URL || "https://localhost:5107/api/auth/refreshToken",
                            { token: localStorage.getItem("token"), refreshToken }
                        );
                        const newToken = response.data.data.token;
                        const newRefreshToken = response.data.data.refreshToken;
                        localStorage.setItem("token", newToken);
                        localStorage.setItem("refreshToken", newRefreshToken);
                        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                        return axios(originalRequest);
                    } catch (refreshError) {
                        console.error("Refresh token error:", refreshError);
                        localStorage.removeItem("token");
                        localStorage.removeItem("refreshToken");
                        window.location.href = "/login";
                        return Promise.reject(refreshError);
                    }
                } else {
                    console.warn("Refresh token not available. Redirecting to login.");
                    window.location.href = "/login";
                }
            } else {
                console.error("API error:", error.response);
                // You can handle other status codes here (e.g., 403 Forbidden, 404 Not Found, etc.)
                if (error.response.status === 403) {
                    alert("You do not have permission to perform this action.");
                } else if (error.response.status === 404) {
                    alert("The requested resource was not found.");
                } else {
                    alert(`An error occurred: ${error.response.statusText}`);
                }
            }

            return Promise.reject(error.response.data || error.message);
        }
    );

    return instance;
};

export default createAxiosInstance;
