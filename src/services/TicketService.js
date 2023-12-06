import * as BaseAPI from './BaseAPI';

export const findTicket = async (data) => {
    return await BaseAPI.postItem(ticketServicesAPI.findTicketAPI, data)

}

const ticketServicesAPI = {
    findTicketAPI: 'ticket/find',
}

const ticketService = {
    findTicket
}
export default ticketService