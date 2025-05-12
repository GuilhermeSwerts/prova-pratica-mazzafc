import { IBuyer } from "../interfaces/Buyer";
import { Buyer } from "../types/buyers/Buyers";
import { api } from "./api";

export const AllBuyers = (params: string, funcResponse: (data: Buyer[]) => void) => {
    api.get<Buyer[]>(`api/buyer?${params}`, response => {
        funcResponse && funcResponse(response);
    })
}

export const DeleteBuyers = (identifier: string, funcResponse: Function) => {
    api.delete<boolean>(`api/Buyer/${identifier}`, response => {
        funcResponse && funcResponse(response);
    })
}

export const EditBuyers = (data: IBuyer, identifier: string, funcResponse: Function) => {
    api.put<boolean>(`api/Buyer/${identifier}`, data, response => {
        funcResponse && funcResponse(response);
    })
}

export const NewBuyers = (data: IBuyer, funcResponse: Function) => {
    api.post<boolean>(`api/Buyer/`, data, response => {
        funcResponse && funcResponse(response);
    })
}

export const BuyersByIdentifier = (identifier: string, funcResponse: (data: Buyer) => void) => {
    api.get<Buyer>(`api/Buyer/${identifier}`, response => {
        funcResponse && funcResponse(response);
    })
}
