import * as BaseAPI from './BaseAPI';

export const createReview = async (data) => {
    return await BaseAPI.createFormData(reviewSV.createReview, data);
}
export const getAllInBus = async (params) => {
    return await BaseAPI.getItems(reviewSV.getAllInBus, params);
}


const reviewSV = {
    createReview: 'reviews/create',
    getAllInBus: 'reviews/inBus'
}