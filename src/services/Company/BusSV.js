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


export const addBusStops = async (data) => {
    return await BaseAPI.putItem(busServices.addBusStops, data);
}

export const GetInRoute = async (params) => {
    return await BaseAPI.getItems(busServices.GetInRoute, params);
}
export const getById = async (params) => {
    return await BaseAPI.getItems(busServices.getById, params);
}

export const update = async (data) => {
    return await BaseAPI.putItem(busServices.update, data);
}
const busServices = {
    allBusOfCompany: 'buses/getAll',
    getById: 'buses/get',
    createNewBus: 'buses/create',
    addBusStops: 'buses/addBusStops',
    changeIsDisable: 'buses/changeIsDisable',
    changeIsActive: 'buses/changeIsActive',
    GetInRoute: 'buses/GetInRoute',
    getById: 'buses/get',
    update: 'buses/update'
}