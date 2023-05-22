import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";


// export  function gte(control: AbstractControl): 
//          Observable<ValidationErrors> | null {
 
//     return null
 
// }

export function existEmailValidator(existUserEmails :string[]):ValidatorFn{
    return(control: AbstractControl): ValidationErrors | null =>{
        let emailValue: string = control.value;
        let validationErr = { EmailExist: { value: emailValue } };
        if (emailValue.length == 0 && control.untouched) {
          return null;
        } else {
          let foundEmail = existUserEmails.includes(emailValue);
          return foundEmail ? validationErr : null;
        }
      }
}



