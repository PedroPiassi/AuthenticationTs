import axios from "axios";

const useApi = () => {
    const api = axios.create({
        baseURL: import.meta.env.VITE_REACT_APP_API_URL
    });

    return { api };
};

export default useApi;
