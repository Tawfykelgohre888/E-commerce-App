import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CartService } from './../../core/service/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);
  cardDetails: Icart = {} as Icart;

  ngOnInit(): void {
    this.getLoggedCart();
  }

  getLoggedCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        if (res?.data) {
          console.log(res.data);
          this.cardDetails = res.data;

          // Use NgZone and always update inside Angular Zone
          this.ngZone.run(() => {
            this.changeDetectorRef.detectChanges();
          });
        } else {
          console.warn('The vehicle or data is incorrect.');
          this.cardDetails = {} as Icart;
        }
      },
      error: (err) => {
        console.error('Error in bringing car data', err);
      },
    });
  }

  removeCartItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        if (res?.data) {
          console.log(res);
          this.cardDetails = res.data;
// Using NgZone to ensure updates within Angular's Zone
          this.ngZone.run(() => {
            this.changeDetectorRef.detectChanges();
          });

          if (res.numOfCartItems !== undefined) {
            this.cartService.cartCount.set(res.numOfCartItems);
          }
        } else {
          console.warn(' The cart was not updated after removing the item.     ');
        }
      },
      error: (err) => {
        console.error('Error removing item from Arabs:', err);
      },
    });
  }

  updateProduct(id: string, count: number): void {
    this.cartService.updateQuantityProduct(id, count).subscribe({
      next: (res) => {
        if (res?.data) {
          console.log(res);
          this.cardDetails = res.data;
// Using NgZone to ensure updates within Angular's Zone
          this.ngZone.run(() => {
            this.changeDetectorRef.detectChanges();
          });
        } else {
          console.warn('The quantity was not updated correctly.');
        }
      },
      error: (err) => {
        console.error('Error updating product quantity', err);
      },
    });
  }

  clearItem(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cardDetails = {} as Icart;
        this.cartService.cartCount.set(0);
// Using NgZone to ensure updates within Angular's Zone
        this.ngZone.run(() => {
          this.changeDetectorRef.detectChanges();
        });
      },
      error: (err) => {
        console.error('Error scanning shopping cart:', err);
      },
    });
  }
}
