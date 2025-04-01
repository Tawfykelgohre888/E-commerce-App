import { Router } from '@angular/router';
import { AuthService } from './../../core/service/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-psssword',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-psssword.component.html',
  styleUrl: './forget-psssword.component.scss'
})
export class ForgetPssswordComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  step:number = 1;

  verifyEmail:FormGroup  = new FormGroup ({
    email: new FormControl(null , [Validators.required, Validators.email ])
  })


  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null , [Validators.required, Validators.pattern(/^[A-Za-z0-9]{6}$/)])
  })

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required, Validators.email ]),
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(6),Validators.maxLength(30)])
  })


  VerifyEmailSubmit():void{
    this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res)=>{
        console.log(res);
        if (res.statusMsg == 'success') {
          this.step = 2;  // ✅ إصلاح الخطأ هنا
        }
      },error:(err)=>{
        console.log(err);
      }
    })
  }


  VerifyCodeSubmit():void{
    this.authService.setEmailVerify(this.verifyCode.value).subscribe({
      next: (res)=>{
        if(res.status == 'Success'){
          this.step == 3;
        }
        console.log(res);
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  resetPasswordSubmit():void{
    this.authService.setEmailVerify(this.resetPassword.value).subscribe({
      next: (res)=>{
        console.log(res);
        localStorage.setItem('userToken' , res.Token);
        this.router.navigate(['/home'])

      },error:(err)=>{
        console.log(err);
      }
    })
  }

}
