import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FoteerComponent } from "../foteer/foteer.component";

@Component({
  selector: 'app-blank-layout',
  imports: [NavbarComponent, RouterOutlet, FoteerComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent {

}
