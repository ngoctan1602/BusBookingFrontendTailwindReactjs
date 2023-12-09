import * as BaseAPI from './BaseAPI';
import async from "async";

export const Register  =  async (data) => {
    return await BaseAPI.createFormData(API.register, data)
}

export const GetProfile = async () => {
    return await BaseAPI.getItems(API.getProfile)
}

const API  = {
    register: 'customer/register',
    getProfile: 'customer/profile',
}

const customerServices = {
    ...GetProfile,
    ...Register
}

export default customerServices;

