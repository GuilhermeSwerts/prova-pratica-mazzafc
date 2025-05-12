import { IOrder } from "../interfaces/Order";
import { Order } from "../types/orders/Order";
import { api } from "./api";

export const AllOrders = (params: string, funcResponse: (data: Order[]) => void) => {
    api.get<Order[]>(`api/order?${params}`, response => {
        funcResponse && funcResponse(response);
    })
}

export const DeleteOrder = (identifier: string, funcResponse: Function) => {
    api.delete<boolean>(`api/order/${identifier}`, response => {
        funcResponse && funcResponse(response);
    })
}

export const NewOrder = (data: IOrder, funcResponse: Function) => {
    api.post<boolean>(`api/order/`, data, response => {
        funcResponse && funcResponse(response);
    })
}

export const EditOrder = (data: IOrder, identifier: string, funcResponse: Function) => {
    api.put<boolean>(`api/order/${identifier}`, data, response => {
        funcResponse && funcResponse(response);
    })
}

export const OrderByIdentifier = (identifier: string, funcResponse: (data: Order) => void) => {
    api.get<Order>(`api/order/${identifier}`, response => {
        funcResponse && funcResponse(response);
    })
}