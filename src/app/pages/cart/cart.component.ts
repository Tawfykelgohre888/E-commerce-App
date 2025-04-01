import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CartService } from './../../core/service/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cardDetails: Icart = {} as Icart;

  ngOnInit(): void {
    this.getLoggedCart();
  }

  getLoggedCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cardDetails = res.data ?? {} as Icart;
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
      }
    });
  }

  removeCartItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cardDetails = res.data ?? {} as Icart;
        if (res.numOfCartItems !== undefined) {
          this.cartService.cartCount.set(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.error('Error removing cart item:', err);
      }
    });
  }
  

  updateProduct(id: string, count: number): void {
    this.cartService.updateQuantityProduct(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cardDetails = res.data ?? {} as Icart;
      },
      error: (err) => {
        console.error('Error updating product quantity:', err);
      }
    });
  }

  clearItem(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cardDetails = {} as Icart;
        this.cartService.cartCount.set(0);
      },
      error: (err) => {
        console.error('Error clearing cart:', err);
      }
    });
  }
}