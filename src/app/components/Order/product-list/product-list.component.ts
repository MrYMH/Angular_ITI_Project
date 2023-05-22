import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ICategory } from 'src/app/Models/i-category';
import { IProduct } from 'src/app/Models/i-product';
import { CartVM } from './../../../ViewModels/cart-vm';
// import { StaticProductService } from 'src/app/services/static-product.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnChanges , OnInit {
  // prdList:IProduct[];
  
  prdOfCatId: IProduct[] = [] as IProduct[];
  prdVM! : CartVM;
  
  totalOrderPrice = 0;
  @Input() sentCatId:number = 0
  @Output() totalPriceChanged : EventEmitter<number>
  @Output() newProductAdded : EventEmitter<CartVM>


  constructor(private prdService:ProductsService) {
    
    this.prdService.getAll().subscribe(data => {
      this.prdOfCatId = data;
    })
    // this.prdOfCatId = staticPrdServ.getAllProducts();
    this.totalPriceChanged = new EventEmitter<number>();
    this.newProductAdded = new EventEmitter<CartVM>();
    

  }
  ngOnInit(): void {
    
  }
  ngOnChanges(): void {
    this.filterProductByCatId();
  }
    
  OnCartAdd(prd : IProduct , count:string){
    if(+count > prd.quantity){
      alert("quantity of product is not enough")
    }else{
      prd.quantity -= +count; 
      this.prdVM = new CartVM(prd.name , +count , prd.price , prd.quantity);
      this.newProductAdded.emit(this.prdVM);

    }
    
    
 }

  prdTrackByFn(index : number , prd:IProduct){
      //improve performance of ngfor work
      return prd.id ;
  }

  private filterProductByCatId(){
    // if (this.sentCatId == 0) {
    //   this.prdOfCatId = this.prdList
    // } else {
    //   this.prdOfCatId = this.prdList.filter(prd => prd.CategoryId == this.sentCatId)
      
    // }
    // this.prdOfCatId = this.staticPrdServ.getProductsByCatId(this.sentCatId);
    this.prdService.getProductsByCatId(this.sentCatId).subscribe((data) => {
      this.prdOfCatId = data;
    })
  }

  
}
