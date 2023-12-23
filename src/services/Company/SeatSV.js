import * as BaseAPI from '../BaseAPI';

export const getAllSeatCompany = async (params) => {
    return await BaseAPI.getItems(seatService.allSeatOfCompany, params);
}


// export const getBusById = async (id) => {
//     return await BaseAPI.getItems(busServices.getById, id);
// }
const seatService = {
    allSeatOfCompany: 'seatTypes/getAll',
    // getById: 'bus/get',

}