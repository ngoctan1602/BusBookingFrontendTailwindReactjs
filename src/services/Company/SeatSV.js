import * as BaseAPI from '../BaseAPI';

export const getAllSeatCompany = async () => {
    return await BaseAPI.getItems(seatService.allSeatOfCompany);
}


// export const getBusById = async (id) => {
//     return await BaseAPI.getItems(busServices.getById, id);
// }
const seatService = {
    allSeatOfCompany: 'seatType/getAll',
    // getById: 'bus/get',

}