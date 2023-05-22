import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/i-product';
import { ProductsService } from 'src/app/services/products.service';
import { StaticProductService } from 'src/app/services/static-product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  currPrdId:number = 0;
  currPrd:IProduct | null = null;
  prdIdArr : number[] = [];
  constructor(
    private acr:ActivatedRoute , 
    // private prdService:ProductsService ,
    private prdService:StaticProductService ,
    private location : Location,
    private router:Router 
    
    ) {
    
    
  }
  ngOnInit(): void {
    // this.currPrdId = Number(this.acr.snapshot.paramMap.get('id'));
    // this.currPrd = this.prdService.getProductById(this.currPrdId);
    
    this.prdIdArr = this.prdService.getPrdIds();

    //when navigate to same component , angular will not reload component
    //even if there is changes in route parameters.
    
    this.acr.paramMap.subscribe(paramMap => {
      this.currPrdId = Number(paramMap.get('id'));
      this.currPrd = this.prdService.getProductById(this.currPrdId);
    });
  }

  handleBack(){
    this.location.back();
    
  }

  goToPrevPrd()
  {
    //prev prd:
    let currIndex = this.prdIdArr.findIndex(el => el==this.currPrdId);
    let prevId = this.prdIdArr[currIndex - 1];
    this.router.navigate(['/Product' , prevId]);
    
    
  }

  goToNextPrd()
  {
    //nxt prd: 
    let currIndex = this.prdIdArr.findIndex(el => el==this.currPrdId);
    let nxtId = this.prdIdArr[currIndex + 1];
    this.router.navigate(['/Product' , nxtId]);
    
    
  }
}
