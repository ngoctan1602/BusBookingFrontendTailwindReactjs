import * as BaseAPI from '../BaseAPI';

export const createTicket = async (data) => {
    return await BaseAPI.postItem(ticketServices.createTicket, data);
}
export const getAllTicketInCompany = async (params) => {
    return await BaseAPI.getItems(ticketServices.getAllTicketInCompany, params)
}

export const changeCompleteStatus = async (id) => {
    return await BaseAPI.putItem(ticketServices.changeCompleteStatus, null, id)
}

export const deleteTicket = async (id) => {
    return await BaseAPI.deleteItem(ticketServices.deleteTicket, id)
}
const ticketServices = {
    changeCompleteStatus: 'tickets/ChangeCompleteStatus',
    deleteTicket: "tickets/delete",
    createTicket: 'tickets/create',
    getAllTicketInCompany: 'tickets/getAll',
}