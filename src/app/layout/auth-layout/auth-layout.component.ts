import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FoteerComponent } from "../foteer/foteer.component";

@Component({
  selector: 'app-auth-layout',
  imports: [NavbarComponent, RouterOutlet, FoteerComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
