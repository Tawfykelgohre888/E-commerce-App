import { AuthService } from './../../core/service/auth/auth.service';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private readonly formBuilder = inject(FormBuilder);

  isLoading: boolean = false;
  errorMassge: string = '';
  success: string = '';

  registerForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required,Validators.minLength(3),Validators.minLength(3),Validators.maxLength(20)]] ,
    email: [null, [Validators.required,Validators.minLength(6), Validators.maxLength(30),]],
    password: [null, [ Validators.required,Validators.minLength(6),Validators.maxLength(30),]],
    rePassword : [null, [Validators.required]],
    phone: [null, [ Validators.required,Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)] ]
  }, {validators: this.confirmPassword})

  // registerForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(6),
  //       Validators.maxLength(30),
  //     ]),
  //     rePassword: new FormControl(null, [Validators.required]),
  //     phone: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/),
  //     ]),
  //   },
  //   this.confirmPassword
  // );

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 500);
            this.success = res.message;
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMassge = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }

  confirmPassword(group: any) {
    // password
    // rePassword
    const password = group.get('password').value;
    const rePassword = group.get('rePassword').value;
    return password === rePassword ? null : { mismatch: true };
  }
}
