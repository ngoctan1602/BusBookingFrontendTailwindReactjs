import * as BaseAPI from './BaseAPI';

export const GetAllCompany = async (pageSize) => {
    return await BaseAPI.getItems(API.getAll, pageSize)
}
export const ChangIsActive = async (params) => {
    return await BaseAPI.getItems(API.ChangIsActive, params)
}
export const ChangeIsLock = async (params) => {
    return await BaseAPI.putItem(API.ChangeIsLock, null, params)
}
export const Delete = async (params) => {
    return await BaseAPI.deleteItem(API.delete, params)
}
export const Register = async (data) => {
    return await BaseAPI.createFormData(API.register, data)
}
const API = {
    register: 'companies/register',
    getAll: 'companies/admin/getAll',
    ChangIsActive: 'companies/admin/active',
    ChangeIsLock: 'companies/admin/ChangeIsLock',
    delete: 'companies/delete'
}

const companiesSV = {
    ...GetAllCompany,
    ...ChangIsActive,
    ...ChangeIsLock,
    ...Delete,
    ...Register
}

export default companiesSV;

