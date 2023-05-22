import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IUser } from 'src/app/Models/iuser';
import { existEmailValidator } from 'src/app/customValidators/existEmail.validator';
import { passwordMatchValidator } from 'src/app/customValidators/passwordMatch.validator';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  userRegFrm:FormGroup
  existUserEmails:string[] = []
  addedUser:IUser = {} as IUser;
  constructor(private fb:FormBuilder , private user:UserAuthService) {
    // call api to fill existUserEmails or check if our email in frm is alredy exist or not
    // you must better return true if email exist or false if not 
    this.existUserEmails=['aa@aa.aa' , 'bb@bb.bb' , 'cc@cc.cc']

    this.userRegFrm = fb.group({
      // fullName:fb.control('' ,[Validators.required , Validators.pattern('[A-Za-z]{3,}')] ),
      fullName:['', [Validators.required , Validators.pattern('[A-Za-z]{3,}')]],
      email: ['', [existEmailValidator(this.existUserEmails) , Validators.required]],
      
      phoneNo: fb.array(['']),  //how to add validation on this array ?????
      address: fb.group({
        city:[''],
        postalCode:[''],
        street:[''],
      }),
      password: ['' , [Validators.required]],
      confirmPassword: ['' , [Validators.required]],
      referral:[''],
      referralOther:['']
    } , {validators:passwordMatchValidator()})

    // this.userRegFrm = new FormGroup({
    //   fullName:new FormControl('' , [Validators.required , Validators.pattern('[A-Za-z]{3,}')]),
    //   email: new FormControl(''),
    //   phoneNo: new FormControl(''),
    //   address: new FormGroup({
    //     city:new FormControl(''),
    //     postalCode:new FormControl(''),
    //     street:new FormControl(''),
    //   }),
    //   password: new FormControl(''),
    //   confirmPassword: new FormControl('')
    // })
    
  }
  ngOnInit(): void {

  }

  get fullName(){
    return this.userRegFrm.get('fullName');
  }

  get referral(){
    return this.userRegFrm.get('referral');
  }

  get referralOther(){
    return this.userRegFrm.get('referralOther');
  }

  get email(){
    return this.userRegFrm.get('email');
  }

  get password(){
    return this.userRegFrm.get('password');
  }

  get confirmPassword(){
    return this.userRegFrm.get('confirmPassword');
  }

  get phoneNos(){
    return this.userRegFrm.get('phoneNo') as FormArray;
  }

  fillForm(){
    //in ngoninit:
    //[1] check for path params , to specify user register or edit profile.
    //[2] in case of edit profile:
    //[3] call api to get user profile
    //[4] [set values , or , patch values]
    //set value must provide all properties , patch value not


    this.userRegFrm.patchValue({
      fullName:'ITI',
      email:'info@iti.gov.eg',
      address:{
        city:'Assiut',
        postalCode:111,
        street:'street 1'
      }
    })


    // this.userRegFrm.setValue({
    //   fullName:'ITI',
    //   email:'info@iti.gov.eg',
    //   address:{
    //     city:'Assiut',
    //     postalCode:111,
    //     street:'street 1'
    //   }
    // }) will not work beacuse the object does not have all props
  }


  //submit:
  submit()
  {
    // let userModel : IUser = <IUser>this.userRegFrm.value 
    let userModel : IUser = this.userRegFrm.value as IUser
    this.user.register(userModel).subscribe(data =>{
      this.addedUser = <IUser>data;
    })

    this.user.setToken(this.addedUser);
  }

  addPhoneNo(event : any)
  {
    this.phoneNos.push(this.fb.control(['']));
    event.target?.classList.add('d-none');
  }

  updateReferralValidator()
  {
    if(this.referral?.value == 'other'){
      this.referralOther?.addValidators([Validators.required])
    }
    else{
      this.referralOther?.clearValidators();
    }

    this.referralOther?.updateValueAndValidity();
  }

  //validatiion:

  // existEmailValidator():ValidatorFn
  // {
  //   return (control : AbstractControl):ValidationErrors | null =>{
  //     let emailValue:string = control.value;
  //     let validationErr = {'EmailExist':{'value':emailValue}}
  //     if(emailValue.length == 0 && control.untouched){
  //       return null;
  //     }
  //     else{
  //       let foundEmail = this.existUserEmails.includes(emailValue);
  //       return (foundEmail) ? validationErr : null
  //     }
  //   }
  // }
}
