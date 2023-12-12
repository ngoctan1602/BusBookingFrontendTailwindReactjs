import * as BaseAPI from './BaseAPI';
import async from "async";

export const Register = async (data) => {
    return await BaseAPI.createFormData(API.register, data)
}

export const GetProfile = async () => {
    return await BaseAPI.getItems(API.getProfile)
}

export const UpdateProfile = async () => {
    return await BaseAPI.postItem(API.updateProfile)
}

const API = {
    register: 'customers/register',
    getProfile: 'customers/profile',
    updateProfile: 'customers/updateProfile'


const customerServices = {
    ...GetProfile,
    ...Register,
    ...UpdateProfile
}

export default customerServices;

