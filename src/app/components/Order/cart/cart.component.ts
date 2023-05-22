import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/Models/i-category';
import { ProductListComponent } from '../product-list/product-list.component';
import { CartVM } from 'src/app/ViewModels/cart-vm';
import { IProduct } from 'src/app/Models/i-product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements AfterViewInit {
  selectedCategory:number = 0
  catList: ICategory[];
  totalOrderPrice:number = 0;
  cartVMList :CartVM[] = [];

  @ViewChild(ProductListComponent) prdListComp! :ProductListComponent
  // ! ==> non null asseration operator.
  
  constructor() {
    this.catList = [
      {Id:1 , Name:"Laptop"},
      {Id:2 , Name:"Tab"},
      {Id:3 , Name:"Mobile"}
    ]
    
  }

  //to call @viewChild() variable
  ngAfterViewInit(): void {
    
  }


  // onTotalPriceChanged(newTotalPrice:number){
  //   this.totalOrderPrice = newTotalPrice;
  // }

  onNewProductadded(cartVM:CartVM){
    this.cartVMList.push(cartVM);
    // this.totalOrderPrice += cartVM.totalPrice;
  }
  // cartTrackByFn(index : number , prdVm:CartVM){
  //   return index;
  // }

  ondelete(prd :CartVM){
    //delete from array
    const index = this.cartVMList.indexOf(prd);
    this.cartVMList.splice(index , 1);
    this.totalOrderPrice -= prd.totalPrice;
  }
  onBuy(){
    this.cartVMList.forEach(prd=>{
      this.totalOrderPrice += prd.totalPrice;
    })
  }

  onCountChange(count:string , prd:CartVM){
     
    if(+count - prd.count < 0){
      prd.quantity += +count
      prd.count = +count
    }
    else{
      if((+count - prd.count) > prd.quantity){
        alert("quantity of product is not enough")
      }else{
        prd.quantity -= +count;
        prd.count = +count
      }
    }
    
  }

}
