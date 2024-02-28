export interface AddProduct{
    productName?:string;
    quantity?:string;
    price?:string;
    description?:string;
    size?:string;
    color?:string;
    image:string[];
    productId:string
    id?:number
}

export interface CartItems{
    id?:number;
    image:string;
    price?:string;
    productId:string
    totalPrice?:string|number;
    productName?:string;
    quantity?:string;
    userId?:number;
    uuid?:string
}