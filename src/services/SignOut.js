import * as BaseAPI from './BaseAPI';
import routes from '../configs/routes';

export const SignOut = async () => {
    localStorage.clear();
    window.location.href = routes.home 
}