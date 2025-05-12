import { Coin } from "../types/Coin/Coin";
import { api } from "./api";

export const AllCoin = (funcResponse: (data: Coin[]) => void) => {
    api.get<Coin[]>(`api/Coin`, response => {
        funcResponse && funcResponse(response);
    })
}
