import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }


  // getServiceIsMostwanted():Observable<any>{
  //   return this.httpClient.get('https://apierp.verzasca.co/api/Landing/GetServiceIsMostWanted')
  // }
  // getAllProducts(id:string):Observable<any>{
  //  return  this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products`)
  // }



  gitAllProduct():Observable<any>{
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }
}
