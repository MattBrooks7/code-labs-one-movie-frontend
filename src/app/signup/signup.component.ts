import { User } from './../shared/models/user';
import { UserService } from './../shared/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  form: FormGroup
  formValues: any
  submitting = false
  hasError = false
  errorMsg: string
  currentUser: User
  private subs = new Subscription()

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.createFormControls()
    this.createForm()
  }

  createFormControls() {
    this.formValues = {
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      nickName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      passwordConfirmation: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])]
    }
  }

  createForm(){
    this.form = this.fb.group(this.formValues, { validator: MustMatch('password', 'passwordConfirmation')})
  }

  // convenience getter for form controls
  get f() {
    if (this.form && this.form.controls) {
      return this.form.controls
    }
  }

  submitForm() {
    this.hasError = false
    this.submitting = true
    console.log(this.form.invalid)
    console.log(this.form.controls.passwordConfirmation)
    if (this.form.invalid) {
      this.hasError = true
      this.submitting = false
      console.log(this.form.errors)
      return
    }
    const form = this.form.value
    const params = {
      first_name: form.firstName,
      last_name: form.lastName,
      nickname: form.nickName,
      email: form.email,
      password: form.password,
      password_confirmation: form.passwordConfirmation,
    }
    this.subs.add(
      this.userService.signup(params).subscribe(data => {
        if (data && data.sucess && data.user) {
          this.currentUser = data.user
          this.submitting = false
          this.router.navigate(['/home'])
        }
      }, error => {
        if (error) {
          console.log(error)
          this.submitting = false
          this.errorMsg = 'User already exisits in this system! Please Login!'
        }
      })
    )
  }

  cancelForm() {
    this.form.reset()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}