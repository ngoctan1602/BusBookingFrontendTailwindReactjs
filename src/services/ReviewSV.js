import * as BaseAPI from './BaseAPI';

export const createReview = async (data) => {
    return await BaseAPI.createFormData(reviewSV.createReview, data);
}

// export const changeIsDelete = async (id) => {
//     return await BaseAPI.putItemParams(reviewSV.changeIsDelete, id);
// }
const reviewSV = {
    createReview: 'reviews/create',
    changeIsDelete: 'reviews/changeIsDelete'
}