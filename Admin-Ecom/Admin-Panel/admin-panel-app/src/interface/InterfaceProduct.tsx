
export interface AddProduct{
    productId?:any
    productName?:string;
    quantity?:string;
    price?:string;
    description?:string;
    selectedSize?:any[];
    productColor?:any;
    selectedImages?:string[];
}
export interface ProductColor{
    color?:string
}

export interface CartItems{
    id?:number;
    image?:string;
    price?:string;
    totalPrice?:string|number;
    productName?:string;
    quantity?:string;
    userId?:number;
    uuid?:string
}