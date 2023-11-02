import axios from "axios";

const instance = ()=> {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null
    const instance = axios.create({
        baseURL: "http://localhost:5107/api/",
        setTimeout: 10000,
        headers: {
            "Authorization": "Bearer " + token,
        }
    });
    instance.interceptors.request.use();
    instance.interceptors.response.use(Success, Error);
    return instance;
}

const Success = (response) => {
    return response.data;
}
const Error = (error) => {
    return error.response.data;
}

export default instance;