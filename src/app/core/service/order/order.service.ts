import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}
  Token = JSON.stringify(localStorage.getItem('userToken'));

  createCashOrder(
    id: string,
    shippingAddress: { details: string; phone: number; city: string }
  ): Observable<any> {
    return this.httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders${id}`,
      { shippingAddress },
      {
        headers: {
          token: this.Token,
        },
      }
    );
  }

  getAllProduct(): Observable<any> {
    return this.httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/`
    );
  }

  getUserOrder(id: string): Observable<any> {
    return this.httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
  }

  checkOutSession(
    id: string,
    shippingAddress: { details: string; phone: number; city: string }
  ): Observable<any> {
    return this.httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      { shippingAddress },
      {
        headers: {
          token: this.Token,
        },
      }
    );
  }
}
