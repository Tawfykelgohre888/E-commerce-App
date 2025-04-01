import { AuthService } from './../../core/service/auth/auth.service';
import { Component, inject, Input, Signal, effect } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/service/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() isLogin: boolean = true;

  readonly authService = inject(AuthService);
  readonly cartService = inject(CartService);

  countNumber: Signal<number> = this.cartService.cartCount;

  private cartEffect = effect(() => {
    const cartCountValue = this.cartService.cartCount();
    console.log('Cart Count Updated:', cartCountValue);
  });

  constructor() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
      },
    });
  }
}
