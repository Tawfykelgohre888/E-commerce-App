import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../core/service/order/order.service';
import { AuthService } from '../../core/service/auth/auth.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export class AllOrdersComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);

  idUser: string = '';

  arrayAllProducts: any[] = [];

  ngOnInit(): void {
    this.authService.saveUserData();
    this.idUser = this.authService.userData._id;
    console.log(this.idUser);
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getAllProduct().subscribe({
      next: (res) => {
        console.log(res);
        this.arrayAllProducts = res
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
