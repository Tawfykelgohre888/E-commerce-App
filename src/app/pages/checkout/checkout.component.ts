import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../core/service/cart/cart.service';
import { OrderService } from '../../core/service/order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  cheakOutForm!: FormGroup;
  private readonly formBuilder = inject(FormBuilder);
  private readonly orderService = inject(OrderService);
  private readonly activatedRoute = inject(ActivatedRoute);
  cartId: string = '';
  initForm(): void {
    this.cheakOutForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^(01[0-2,5]{1}[0-9]{8})$/)],
      ],
      city: [null, Validators.required],
    });
  }
  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (parm) => {
        this.cartId = parm.get('id')!;
      },error:(err)=>{
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  submitForm(): void {
    // console.log(' Form Submitted Successfully!', );
    this.orderService
      .checkOutSession(this.cartId, this.cheakOutForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          if(res.status == 'success'){
            open(res.session.url , '_self')
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
