import { Meats } from '../Meat/Meat'
export type Order = {
    identifier: string,
    buyerId: number,
    total: string,
    buyerName: string,
    typeCoin: string,
    typeCoinId: number,
    prefixCoin: string,
    dtRegister: string,
    meats: Meats[];
    quantity: number;
    quantityTotal: number;
}
