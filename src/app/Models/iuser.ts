export interface IUser {
    id:number
    fullName:string;
    email:string;
    phoneNo:string[];
    address:{
        city:string;
        postalCode:number;
        street:string;
    };
    password:string;
    confirmPassword:string;
    referral:string;
    referralOther:string
}
