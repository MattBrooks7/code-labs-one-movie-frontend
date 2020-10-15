
  import { FormGroup } from '@angular/forms';

  // custom validator to check that two fields match
  export function MustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
              // return if another validator has already found an error on the matchingControl
              return;
          }
          console.log('Password =', control.value)
          console.log('Password Confirmation =', matchingControl.value)
          console.log('Password === Password Confirmation', control.value === matchingControl.value)
          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
          } else {
              matchingControl.setErrors({});
          }
      }
  }