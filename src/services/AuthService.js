import * as BaseAPI from './BaseAPI';

export const login =async (data) => {
    return await BaseAPI.postItem(AuthAPI.login, data)
}

export const register =async (data) => {
    return await BaseAPI.postItem(AuthAPI.register, data)
}

const AuthAPI = {
    login: 'auth/login/',
    register: 'customer/register/',
    resetPassword: 'auth/reset/'
}
