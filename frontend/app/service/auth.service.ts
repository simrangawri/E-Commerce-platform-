import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="http://localhost:9010/users/"
  constructor(private http:HttpClient) { }
  //to get login details of a user
  getlogin(email: any)
  {
    return this.http.get(this.url+email);
  }
  //to post details of a user
  postregister(data: any)
  {
    return this.http.post(this.url,data);
  }
  //to check if user is valid or not
  isLoggedIn()
  {
    return localStorage.getItem('token')!=null
  }
  //to get value of token from storage
  getToken()
  {
    return localStorage.getItem('token')
  }

}

