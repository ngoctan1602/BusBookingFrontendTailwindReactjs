    import * as BaseAPI from './BaseAPI';

export const getProfile = async() => {
    return await BaseAPI.getItems(profileService.profile);
}

export const updateProfile = async(data) =>{
    return await BaseAPI.postItem(profileService.updateProfile, data)
}
const profileService = {
    profile: 'customer/profile/',
    updateProfile: 'customer/updateProfile/'
}