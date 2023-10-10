import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit 
{
  logIn = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  error = false

  get email() 
  { 
    return this.logIn.get('email')
  }
  get password() 
  {
     return this.logIn.get('password')
  }

  constructor(private router: Router, private service: AuthService) { }
  ngOnInit(): void {}
  result: any
  login() 
  {
    console.log(this.logIn.value)

    this.service.getlogin(this.logIn.value.email).subscribe((result) => {
      console.warn(result)
      this.result = result

      if (result == null)
      {
        this.error = true
      }
      else 
      {
        if (this.result.password == this.logIn.value.password) 
        {
          localStorage.setItem('token',this.result.email);
          this.router.navigate(['']);
        }
        else 
        {
          this.error = true
        }
      }
    })
  }
}



