import * as BaseAPI from './BaseAPI';

export const Register = async (data) => {
    return await BaseAPI.createFormData(API.register, data)
}

export const GetProfile = async () => {
    return await BaseAPI.getItems(API.getProfile)
}

export const UpdateProfile = async (data) => {
    return await BaseAPI.putItem(API.updateProfile, data)
}

export const GetAll = async (params) => {
    return await BaseAPI.getItems(API.getAll, params)
}

export const AuthOTP = async (data) => {
    return await BaseAPI.postItem(API.authOTP, data)
}

export const changeIsActive = async (params) => {
    return await BaseAPI.putItem(API.changeIsActive, null, params)
}
export const changeIsLock = async (params) => {
    return await BaseAPI.putItem(API.changeIsLock, null, params)
}
export const changeIsDelete = async (params) => {
    return await BaseAPI.putItem(API.changeIsDelete, null, params)
}

export const loginOnGoolge = async (token) => {
    return await BaseAPI.postItem(API.loginOnGoolge, token)
}
export const find = async (param) => {
    return await BaseAPI.getItems(API.find, param)
}
export const StatisticalCustomer = async () => {
    return await BaseAPI.getItems(API.totalCustomer)
}

const API = {
    getAll: 'customers/getAll',
    register: 'customers/register',
    getProfile: 'customers/profile',
    updateProfile: 'customers/updateProfile',
    authOTP: 'customers/authOTP',
    changeIsActive: 'customers/changeIsActive',
    changeIsLock: 'customers/changeIsLock',
    changeIsDelete: 'customers/changeIsDelete',
    loginOnGoolge: 'customers/loginOnGoogle',
    find: 'customers/find',
    totalCustomer: 'customers/StatisticalCustomer',
}

const customerServices = {
    ...GetProfile,
    ...Register,
    ...UpdateProfile,
    ...GetAll,
    ...AuthOTP,
    ...find,
    ...StatisticalCustomer,
}

export default customerServices;

