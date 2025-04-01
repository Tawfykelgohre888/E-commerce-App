import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../core/service/cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  cheakOutForm!: FormGroup;
  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    // this.cheakOutForm = new FormGroup({
    //   details: new FormControl(null, [Validators.required]),
    //   phone: new FormControl(null, [
    //     Validators.required,
    //     Validators.pattern(/^(01[0-2,5]{1}[0-9]{8})$/),
    //   ]),
    //   city: new FormControl(null, [Validators.required]),
    // });

    this.cheakOutForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^(01[0-2,5]{1}[0-9]{8})$/)],
      ],
      city: [null, Validators.required],
    });
  }

  submitForm(): void {
    if (this.cheakOutForm.valid) {
      console.log('✅ Form Submitted Successfully!', this.cheakOutForm.value);
    } else {
      console.log('❌ Form is invalid!');
    }
  }


}
