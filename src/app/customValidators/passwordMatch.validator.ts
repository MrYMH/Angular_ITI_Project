import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function passwordMatchValidator():ValidatorFn{
    return(control: AbstractControl): ValidationErrors | null =>{
        let passControl = control.get('password');
        let passConfirmControl = control.get('confirmPassword');
        if(!passControl || !passConfirmControl || !passControl.value || !passConfirmControl.value)
            return null;
        
        let valErr = {'unmatchedPassword':{'pass':passControl , 'passConfirm':passConfirmControl}}
        return(passControl.value == passConfirmControl.value)?null:valErr;
      }
}