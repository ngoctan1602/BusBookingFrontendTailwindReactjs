import * as BaseAPI from './BaseAPI';

export const Register  =  async (data) => {
    return await BaseAPI.createFormData(API.register, data)
}

const API  = {
    register: 'customer/register'
}

