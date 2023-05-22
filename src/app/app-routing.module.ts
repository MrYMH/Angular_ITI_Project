import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';


const routes: Routes = [
  {path:'' , component:MainLayoutComponent , children:[
    {path:'' , redirectTo: '/Home' , pathMatch:'full'},
    {path:'Home' , component : HomeComponent},
    {
      path: 'Orders', 
      loadChildren: () => import('src/app/components/orders/orders.module')
        .then(m => m.OrdersModule)
    },
    
  ]},
  {
    path: 'User', 
    loadChildren: () => import('src/app/components/user/user.module')
      .then(m => m.UserModule)
  },
  {path:'**' , component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
