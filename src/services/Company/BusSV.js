import * as BaseAPI from '../BaseAPI';

export const getAllBusOfCompany = async () => {
    return await BaseAPI.getItems(busServices.allBusOfCompany);
}


export const getBusById = async (id) => {
    return await BaseAPI.getItems(busServices.getById, id);
}

export const createBus = async (data) => {
    return await BaseAPI.postItem(busServices.createNewBus, data);
}

const busServices = {
    allBusOfCompany: 'buses/getAll',
    getById: 'buses/get',
    createNewBus: 'buses/create',
    getSeatOfBus: ''
    // getWards: 'districts/getById',
    // getWardById: 'wards/getById'
}