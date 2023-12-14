import * as BaseAPI from './BaseAPI';

export const createReview = async (data) => {
    return await BaseAPI.createFormData(reviewSV.createReview, data);
}

const reviewSV = {
    createReview: 'reviews/create',
}