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
export const find = async (param) => {
    return await BaseAPI.getItems(busStationSV.find, param)

}
export const changeActive = async (param) => {
    return await BaseAPI.getItems(busStationSV.changeActive, param)

}
export const changeDiasable = async (param) => {
    return await BaseAPI.getItems(busStationSV.changeDisable, param)

}
const busStationSV = {
    allBusStation: 'stations/getall',
    getByLocation: 'stations/getByLocation',
    updateBusStation: 'stations/admin/update',
    createBusStation: 'stations/admin/create',
    getAllInBus: 'stations/getallinbus',
    find: 'stations/admin/find',
    changeActive: "stations/admin/active",
    changeDisable: "stations/admin/disable"
}