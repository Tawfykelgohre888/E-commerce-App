import { jwtDecode } from 'jwt-decode';
import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient:HttpClient) { }
  private  readonly router = inject(Router)
  userData:any='';
  baseUrl:string = 'https://ecommerce.routemisr.com';
  sendRegisterForm(data:object): Observable<any>{
   return  this.httpClient.post(`${this.baseUrl}/api/v1/auth/signup`,data)
  }
  sendLoginForm(data:object): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/signin`,data)
  }
  saveUserData():void{
    if(localStorage.getItem('userToken')!== null){
     this.userData = jwtDecode(localStorage.getItem('userToken') !)
    }
  }
  logOut():void{
    localStorage.removeItem('userToken');
    this.userData = null;
    // nvgation router
    this.router.navigate(['/login'])
  }
  setEmailVerify(data:object):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }
  setCodeVerify(data:object):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }
  setResetCode(data:object):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/resetPassword`,data)
  }
}
