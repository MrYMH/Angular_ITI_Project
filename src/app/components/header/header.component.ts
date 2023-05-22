import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Models/iuser';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  isUserlogged : boolean = false
  constructor(private user :UserAuthService) {
    
    // this.isUsserlogged = user.isUserLogged
  }

  ngOnInit(): void {
    // this.isUsserlogged = this.user.isUserLogged
    this.user.getLoggedStatus().subscribe(status=>{
      this.isUserlogged = status;
    })
  }

  logout(){
    
    this.user.logout();
    // // this.isUserlogged = this.user.isUserLogged;
  }

}
