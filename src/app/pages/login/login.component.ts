import { AuthService } from './../../core/service/auth/auth.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  errorMassge: string = '';
  success: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
    ]),
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            // setTimeout(() => {
              // save token
              localStorage.setItem('userToken', res.token);
              // decode token
              this.authService.saveUserData()
              // navigate to home 
              this.router.navigate(['/home']);
            // }, 500);
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
}
