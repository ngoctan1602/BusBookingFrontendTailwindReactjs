import * as BaseAPI from './BaseAPI';

export const findTicket = async (data, params) => {
    return await BaseAPI.postItemParams(ticketServicesAPI.findTicketAPI, data, params)

}

const ticketServicesAPI = {
    findTicketAPI: 'tickets/find',
}

const ticketService = {
    findTicket
}
export default ticketService