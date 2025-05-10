import { IMeat } from "../interfaces/Meat";
import { api } from "./api"
export const DeleteMeat = (identifier: string, funcResponse: Function) => {
    api.delete(`api/meat/${identifier}`, response => {
        const { responseData } = response.data;
        funcResponse && funcResponse(responseData);
    })
}

export const NewMeat = (data: IMeat, funcResponse: Function) => {
    api.post(`api/meat/`, data, response => {
        const { responseData } = response.data;
        funcResponse && funcResponse(responseData);
    })
}

// {
//     requestSuccess: true,
//     responseData:{},
//     erro: {
//         message: "",
//         exception:""
//     },
//     statusCode: 200
// }