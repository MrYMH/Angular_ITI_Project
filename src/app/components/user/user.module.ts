import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { LoginComponent } from '../login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes:Routes = [
  {path:'' , redirectTo:'/User/UserProfile' , pathMatch:'full'},
  {path:'UserProfile' , component:UserProfileComponent},
  {path:'EditProfile' , component:EditProfileComponent},
  {path:'Login' , component:LoginComponent},
  {path:'Register' , component:UserRegisterComponent}
]

@NgModule({
  declarations: [
    UserProfileComponent,
    EditProfileComponent,
    UserRegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
