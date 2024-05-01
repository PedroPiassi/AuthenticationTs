import useApi from "./api";

interface LoginInterface {
    email: string,
    password: string
}

const useAuthService = () => {
    const { api } = useApi();

    return {
        authentication: async (data: LoginInterface) => {
            return await api.post('/login', data);
        },

        isLoged: async (token: string) => {
            return await api.post('/auth', {}, { headers: { Authorization: `Bearer ${token}` }});
        },
    };
};

export default useAuthService;