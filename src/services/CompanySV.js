import * as BaseAPI from './BaseAPI';

export const GetAllCompany = async (pageSize) => {
    return await BaseAPI.getItems(API.getAll, pageSize)
}


const API = {
    getAll: 'companies/admin/getAll',
}

const companiesSV = {
    ...GetAllCompany,
}

export default companiesSV;

