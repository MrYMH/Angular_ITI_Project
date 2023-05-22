export class CartVM {
    /**
     *
     */
    public totalPrice:number
    constructor(
        public prdName:string,
        public count:number,
        public price:number,
        public quantity:number,
        

    ) {
        this.totalPrice = this.price * this.count;
        
    }
}
