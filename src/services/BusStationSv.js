import * as BaseAPI from './BaseAPI';

export const getAllBusStation = async (pageSize) => {
    return await BaseAPI.getItems(busStationSV.allBusStation, pageSize);
}

export const getAllBusStationWithParams = async (params) => {
    return await BaseAPI.getItems(busStationSV.allBusStation, params);
}

export const getByLocation = async (location) => {
    return await BaseAPI.getItems(busStationSV.getByLocation, location);
}

export const getAllInBus = async (busId) => {
    return await BaseAPI.getItems(busStationSV.getAllInBus, busId);
}

export const updateBusStation = async (data) => {
    return await BaseAPI.putItem(busStationSV.updateBusStation, data)
}
export const createBusStation = async (data) => {
    return await BaseAPI.postItem(busStationSV.createBusStation, data)
}
const busStationSV = {
    allBusStation: 'stations/getall',
    getByLocation: 'stations/getByLocation',
    updateBusStation: 'stations/admin/update',
    createBusStation: 'stations/admin/create',
    getAllInBus: 'stations/getallinbus'
}