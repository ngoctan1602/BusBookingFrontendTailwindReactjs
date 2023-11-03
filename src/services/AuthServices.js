import * as BaseAPI from './BaseAPI';

export const login =async (data) => {
    return await BaseAPI.postItem(AuthAPI.login, data)
}

const adminLogin = async (data) => {
    return await BaseAPI.postItem(AuthAPI.adminLogin, data)
}

const companyLogin = async (data) => {
    return await BaseAPI.postItem(AuthAPI.companyLogin, data)
}

const AuthAPI = {
    login: 'auth/login',
    adminLogin: 'auth/admin/login',
    companyLogin: 'auth/company/login',
}

const authServices = {
    ...login,
    ...adminLogin,
    ...companyLogin
} 

export default authServices;