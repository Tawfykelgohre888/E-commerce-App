import { Injectable, Inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  userToken: string = '';

  // ✅ استبدال BehaviorSubject بـ WritableSignal
  cartCount: WritableSignal<number> = signal(0);

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.userToken = localStorage.getItem('userToken') || '';
    }
  }

  addProductCart(id: string): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: id });
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`);
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`);
  }

  updateQuantityProduct(id: string, newCount: number): Observable<any> {
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count: newCount });
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`);
  }
}
