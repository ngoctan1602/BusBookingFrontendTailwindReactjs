import * as BaseAPI from '../BaseAPI';

// export const createReview = async (data) => {
//     return await BaseAPI.createFormData(reviewSV.createReview, data);
// }
// export const getAllRoutes = async () => {
//     return await BaseAPI.getItems(routes.getAllRoutes);
// }
// export const getAllRoutesWithParams = async (params) => {
//     return await BaseAPI.getItems(routes.getAllRoutes, params);
// }

export const createRoute = async (data) => {
    return await BaseAPI.postItem(routeDetail.createRouteDetail, data);
}

export const getInCompany = async (params) => {
    return await BaseAPI.postItem(routeDetail.getInCompany, params);
}

export const getInRoute = async (params) => {
    return await BaseAPI.getItems(routeDetail.getInRoute, params);
}
const routeDetail = {
    // getAllRoutes: 'routes/getAll',
    createRouteDetail: 'RouteDetails/create',
    getInCompany: "RouteDetails/getInCompany",
    getInRoute: "RouteDetails/getInRoute"
}