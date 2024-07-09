import * as BaseAPI from './BaseAPI';

export const findTicket = async (data, params) => {
    return await BaseAPI.postItemParams(ticketServicesAPI.findTicketAPI, data, params)

}

export const totalTicket = async () => {
    return await BaseAPI.getItems(ticketServicesAPI.totalTicket)
}

const ticketServicesAPI = {
    findTicketAPI: 'tickets/find',
    totalTicket: 'tickets/totalTicket',
}

const ticketService = {
    findTicket
}
export default ticketService