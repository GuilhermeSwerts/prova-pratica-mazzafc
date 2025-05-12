import { IMeat } from "../interfaces/Meat";
import { Meats } from "../types/Meat/Meat";
import { api } from "./api"

export const DeleteMeat = (identifier: string, funcResponse: Function) => {
    api.delete<boolean>(`api/meat/${identifier}`, response => {
        funcResponse && funcResponse(response);
    })
}

export const EditMeat = (data: IMeat, identifier: string, funcResponse: Function) => {
    api.put<boolean>(`api/meat/${identifier}`, data, response => {
        funcResponse && funcResponse(response);
    })
}

export const NewMeat = (data: IMeat, funcResponse: Function) => {
    api.post<boolean>(`api/meat/`, data, response => {
        funcResponse && funcResponse(response);
    })
}

export const AllMeats = (params: string, funcResponse: (data: Meats[]) => void) => {
    api.get<Meats[]>(`api/meat?${params}`, response => {
        funcResponse && funcResponse(response);
    })
}

export const MeatByIdentifier = (identifier: string, funcResponse: (data: Meats) => void) => {
    api.get<Meats>(`api/meat/${identifier}`, response => {
        funcResponse && funcResponse(response);
    })
}