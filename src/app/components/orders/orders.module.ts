import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from '../Order/product-details/product-details.component';
import { AddProductComponent } from '../Order/add-product/add-product.component';
import { CartComponent } from '../Order/cart/cart.component';
import { ProductListComponent } from '../Order/product-list/product-list.component';
import { AuthGuard } from 'src/app/Guards/auth.guard';
import { LightBoxDirective } from 'src/app/directives/light-box.directive';
import { USDToEGPPipe } from 'src/app/pipes/usdto-egp.pipe';

const routes:Routes = [
    {path:'' , redirectTo:'/Orders/Product', pathMatch:'full'},
    {path:'Product' , component : ProductListComponent},
    {path:'Cart' , component : CartComponent , canActivate:[AuthGuard]},
    {path:'Product/:id' , component : ProductDetailsComponent},
    {path:'Products/Add' , component : AddProductComponent}
]

@NgModule({
  declarations: [
    ProductDetailsComponent,
    AddProductComponent,
    CartComponent,
    ProductListComponent,
    LightBoxDirective,
    USDToEGPPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  
})
export class OrdersModule { }
