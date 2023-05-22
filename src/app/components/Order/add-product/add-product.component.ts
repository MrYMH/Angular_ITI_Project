import { Component } from '@angular/core';
import { ICategory } from 'src/app/Models/i-category';
import { IProduct } from './../../../Models/i-product';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  newprd:IProduct = {} as IProduct
  catList:ICategory[];
  constructor(private prdService:ProductsService , private router:Router) {
    this.catList = [
      {Id:1 , Name:"Laptop"},
      {Id:2 , Name:"Tab"},
      {Id:3 , Name:"Mobile"}
    ]
    
  }


  addProduct()
  {
    this.prdService.addProduct(this.newprd).subscribe((prd)=>{
      alert('product added successfuly');
      this.router.navigate(["/Product"])
    })
  }
}

