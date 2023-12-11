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

export const changeIsDisable = async (id) => {
    return await BaseAPI.getItems(busServices.changeIsDisable, id);
}

export const changeIsActive = async (id) => {
    return await BaseAPI.getItems(busServices.changeIsActive, id);
}

const busServices = {
    allBusOfCompany: 'buses/getAll',
    getById: 'buses/get',
    createNewBus: 'buses/create',
    getSeatOfBus: '',
    changeIsDisable: 'buses/changeIsDisable',
    changeIsActive: 'buses/changeIsActive'
}