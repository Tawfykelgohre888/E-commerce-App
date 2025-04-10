import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  constructor(private httpClient: HttpClient) { }

  addProductToWishList(id: string): Observable<any> {
    const userToken = localStorage.getItem('userToken');
    
    const headers = new HttpHeaders({
      'token': userToken || ''
    });
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      { productId: id },
      { headers }
    );
  }
  getLoggedUserWishlist(): Observable<any> {
    const userToken = localStorage.getItem('userToken');
    
    const headers = new HttpHeaders({
      'token': userToken || ''
    });
    return this.httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      
      { headers }
    );
  }
}
