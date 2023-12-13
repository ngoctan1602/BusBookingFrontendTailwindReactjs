import * as BaseAPI from './BaseAPI';
import async from "async";

export const Register = async (data) => {
    return await BaseAPI.createFormData(API.register, data)
}

export const GetProfile = async () => {
    return await BaseAPI.getItems(API.getProfile)
}

export const UpdateProfile = async (data) => {
    return await BaseAPI.putItem(API.updateProfile, data)
}

export const GetAll = async () => {
    return await BaseAPI.getItems(API.getAll)
}

export const AuthOTP = async (data) => {
    return await BaseAPI.postItem(API.authOTP, data)
}

const API = {
    getAll: 'customers/getAll',
    register: 'customers/register',
    getProfile: 'customers/profile',
    updateProfile: 'customers/updateProfile',
    authOTP: 'customers/authOTP',
}

const customerServices = {
    ...GetProfile,
    ...Register,
    ...UpdateProfile,
    ...GetAll,
    ...AuthOTP,
}

export default customerServices;

