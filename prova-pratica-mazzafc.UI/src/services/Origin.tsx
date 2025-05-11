import { IOrigin } from "../interfaces/Origin";
import { api } from "./api";

export const AllOrigins = (funcResponse: (data: IOrigin[]) => void) => {
    api.get<IOrigin[]>(`api/origin/`, response => {
        funcResponse && funcResponse(response);
    })
}