import { Injectable } from '@angular/core';
// import { IProduct } from '../Models/i-product';
import { IProduct } from 'src/app/Models/i-product';

@Injectable({
  providedIn: 'root'
})
export class StaticProductService {
  private prdList:IProduct[];
  constructor() { 
    this.prdList = [
      {id:100 , name:'lenovoThinkpad laptop' , price:100000 , quantity:1 , imageUrl:"Https://picsum.photos/120/70" , categoryId:1},
      {id:200 , name:'Apple MacBook laptop' , price:200000000 , quantity:0 , imageUrl:"Https://picsum.photos/120/70" , categoryId:1},
      {id:300 , name:'Lenovo Tab 2' , price:30000.5679955 , quantity:10 , imageUrl:"Https://picsum.photos/120/70" , categoryId:2},
      {id:400 , name:'Samsung Tab' , price:4000000.890 , quantity:2 , imageUrl:"Https://picsum.photos/120/70" , categoryId:2},
      {id:500 , name:'Samsung Note 10' , price:50070.11233 , quantity:0 ,imageUrl:"Https://picsum.photos/120/70" , categoryId:3},
      {id:600 , name:'Samsung S22 Ultra' , price:6000000000 , quantity:1 , imageUrl:"Https://picsum.photos/120/70" , categoryId:3}
    ]

  }

  getAllProducts(){
    return this.prdList;
  }

  getProductsByCatId(catId:number):IProduct[]
  {
    // let result :IProduct[] = [];
    // this.prdList.forEach(prd => {
    //   if(prd.CategoryId == catId){
    //     result.push(prd)
    //   }
    // })
    // return result;
    if (catId == 0) {
      return this.prdList
    } else {
      let prdOfCatId = this.prdList.filter(prd => prd.categoryId == catId);
      return prdOfCatId;
      
    }
  }

  getProductById(id:number):IProduct | null
  {
    let result = this.prdList.find(p => p.id == id);
    if(result == undefined){
      return null;
    }else{
      return result;
    }
  }

  deleteProduct(id:number){
    
  }

  getPrdIds():number[]
  {
    let prdIds:number[] = this.prdList.map(prd => prd.id);
    return prdIds;
  }



}
