import * as BaseAPI from '../BaseAPI';

export const createTicket = async (data) => {
    return await BaseAPI.postItem(ticketServices.createTicket, data);
}

const ticketServices = {

    createTicket: 'tickets/create',

}