import { api } from "../ApiFunctions"

export const authService = {
    //dang nhap - server set refreshToken cookie + trar accessToken
    login: (email, password) => {
        return api.post('/auth/login', { email, password }, { skipAuth: true });
    },

    //dang ky
    register: (firstName, lastName, phone, address, email, password) => {
        return api.post(
            '/auth/register-user',
            {
                firstName,
                lastName,
                phone,
                address,
                email,
                password
            },
            { skipAuth: true }
        );
    },
    /*
        lay accessToken moi tu refreshToken cookie
    */
    refresh: async () => {
        const baseUrl = "http://localhost:9192/api/v1";
        const response = await fetch(`${baseUrl}/auth/refresh-token`,
            {
                method: 'POST',
                credentials: 'include', //gui kem cookie
            });
        if (!response.ok) {
            throw new Error('Refresh failed');
        }
        return response.json();
    },
};