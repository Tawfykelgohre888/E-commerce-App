import { CartService } from './../../core/service/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/service/wishList/wish-list.service';
import { FormsModule, NgModel } from '@angular/forms';
import { SearchPipe } from '../../core/search.pipe';
import { RouterLink } from '@angular/router';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wish-list',
  imports: [FormsModule, SearchPipe, RouterLink,CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent implements OnInit {
  private readonly wishListService = inject(WishListService);
  private readonly cartService = inject(CartService);
  product: Iproduct[] = [];
  text: string = '';

  ngOnInit(): void {
    this.wishListService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res.data);
      this.product = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(id: string): void {
    this.cartService.addProductCart(id).subscribe({
      next: (res) => {
        console.log(res);

        this.cartService.cartCount.set(res.numOfCartItems);
        // console.log(this.cartService.cartCount);
      },
    });
  }
}
