import * as BaseAPI from './BaseAPI';

// export const createReview = async (data) => {
//     return await BaseAPI.createFormData(reviewSV.createReview, data);
// }
export const getAllRoutes = async () => {
    return await BaseAPI.getItems(routes.getAllRoutes);
}
export const getAllRoutesWithParams = async (params) => {
    return await BaseAPI.getItems(routes.getAllRoutes, params);
}
export const getAllRoutesByCompany = async (params) => {
    return await BaseAPI.getItems(routes.getByCompany, params);
}
export const createRoute = async (data) => {
    return await BaseAPI.postItem(routes.createRoutes, data, null);
}

const routes = {
    getAllRoutes: 'routes/getAll',
    createRoutes: 'routes/create',
    getByCompany: 'routes/getByCompany'
}