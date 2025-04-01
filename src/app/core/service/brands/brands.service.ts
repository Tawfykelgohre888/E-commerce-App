import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllPrands(): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
}
