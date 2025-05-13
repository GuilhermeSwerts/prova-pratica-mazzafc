export interface IOrder {
    identifier?: string;
    buyerId: Number;
    typeCoinId: Number;
    meatOrigins: IOrderMeat[];
}

export interface IOrderMeat {
    id:number;
    quantity:number
    price:number
}