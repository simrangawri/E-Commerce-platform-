import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit 
{

  Registration = new FormGroup({
    email: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })
  error = false

  get email() { return this.Registration.get('email') }
  get firstname() { return this.Registration.get('firstname') }
  get lastname() { return this.Registration.get('lastname') }
  get password() { return this.Registration.get('password') }
  get confirmPassword() { return this.Registration.get('confirmPassword') }



  constructor(private product: AuthService, private router: Router) { }

  ngOnInit(): void {}
  result: any

  register() 
  {
    console.log(this.Registration.value)
    this.product.getlogin(this.Registration.value.email).subscribe((result) =>
     {
      console.warn(result)
      this.result = result
      if (result == null) 
      {
        this.product.postregister(this.Registration.value).subscribe((result) => 
        {
          console.warn(result)
          this.result = result
          this.router.navigate(['login']);
        })
      }
      else
      {
        this.error = true
      }

    })
  }
}