import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  constructor(private httpClient: HttpClient) { }

  wishListCount: WritableSignal<number> = signal(0);

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

  removeProductFromToWishList(): Observable<any> {
    const userToken = localStorage.getItem('userToken');
    
    const headers = new HttpHeaders({
      'token': userToken || ''
    });
    return this.httpClient.delete(
      'https://ecommerce.routemisr.com/api/v1/wishlist/61e81f641904360ec15c6db1',
      
      { headers }
    );
  }



}
