import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isUserLogged :boolean = false;
  userNameErrors:string[] = []
  passwordErrors:string[] = []

  constructor(private user : UserAuthService) {
    this.isUserLogged = this.user.isUserLogged;
  }
  ngOnInit(): void {
    this.isUserLogged = this.user.isUserLogged;
  }

  login(username:string , password:string){
    if(username == ''){
      this.userNameErrors.push('username can not be empty')
      if(password == ''){
        this.passwordErrors.push('password can not be empty')
      }
      else if(password.length < 6){
        this.passwordErrors.push('password must be 6 characters or longer')
      }
    }
    else{
      this.userNameErrors = [];
      this.passwordErrors = [];
      this.user.login(username ,password);
      this.isUserLogged = this.user.isUserLogged;
    }
    
  }

  logout(){
    this.user.logout();
    this.isUserLogged = this.user.isUserLogged;
  }
}
