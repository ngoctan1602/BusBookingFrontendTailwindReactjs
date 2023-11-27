
import * as BaseAPI from './BaseAPI'

export const GetDistrict = async (idDistrict) => {
    return await BaseAPI.getItems(addressAPI.getDistrict, idDistrict)
}

const addressAPI = {
    ward : '',
    getDistrict: 'districts/getById',
    province: ''
}

const addressServices = {
    ...GetDistrict
}
export default addressServices;

