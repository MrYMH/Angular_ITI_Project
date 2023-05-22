import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import { IUser } from 'src/app/Models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService implements OnInit  {
  private isLoggedSubject! : BehaviorSubject<boolean>;
  private apiUrl:string = "http://localhost:3000";
  users :IUser[] = [] as IUser[];

  constructor(private hc : HttpClient) { 
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isUserLogged);
     
  }
  ngOnInit(): void {
    this.getall().subscribe(data=>{
      this.users = (data as IUser[]);
    })
  }
  

  register(newUser:IUser){
   
    this.isLoggedSubject.next(true);
    return this.hc.post(`${this.apiUrl}/users` , newUser);
  }

  setToken(user:IUser){
    localStorage.setItem(`token`,
      `eeeeeeeeeeeee${user.email}ppppppppp${user.password}iiiiiddddd${user.id}`)
  }

  removeToken(user:IUser){
    localStorage.removeItem(`token`)
  }

  getall()
  {
    
    return this.hc.get(`${this.apiUrl}/users`)
    
  }

  private isUserExist(uname:string , email:string){
    this.getall();
    for(let user of this.users){
      if(user.email === email && user.fullName === uname){
        return true;
      }
    }
    return false;
  }

  findUserByEmail( email:string) : IUser |null
  {
    this.hc.get(`${this.apiUrl}/users?email=${email}`).subscribe(data=>{

      return data as IUser;
    })
    return null
  }

  login(uname:string , email:string){
    
    if(this.isUserExist(uname, email)){
      let user = this.findUserByEmail(email);
      if(user != null){
        this.setToken(user);
      }
    }
  }

  logout(){
    // var id = this.users[0].id ;
    // var email = this.users[0].email;
    var id = 1 ;
     this.hc.get(`${this.apiUrl}/users/1`).subscribe(data=>{
      var userfromdb = data as IUser;
      var email = userfromdb.email
      var user = this.findUserByEmail(email);
      if(user != null){
        this.removeToken(user);
      }else{}
     });
    
    this.hc.delete(`${this.apiUrl}/users/delete/${id}`)
    this.isLoggedSubject.next(false);

  }

  
  get isUserLogged(){
    return (localStorage.getItem("token")) ? true : false
  }

  getLoggedStatus()
  {
    // let x= this.isLoggedSubject.asObservable;
    // return x;
    return this.isLoggedSubject.asObservable();
  }

}
