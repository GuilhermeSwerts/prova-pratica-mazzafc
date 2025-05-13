import { User } from "../contexts/UserContext";
import { IUserLogin } from "../interfaces/User";
import { api } from "./api";

export const UserLogin = (data: IUserLogin, funcResponse: (user: User) => void) => {
    api.post<User>(`api/User/login`, data, response => {
        funcResponse && funcResponse(response);
    })
}