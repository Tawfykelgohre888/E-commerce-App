import { FlowbiteService } from './core/service/Flowbit/flowbit.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from "./layout/navbar/navbar.component";
// import { FoteerComponent } from "./layout/foteer/foteer.component";
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
  constructor(private FlowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    setTimeout(() => {
      import('flowbite').then((module) => {
        module.initFlowbite();
      });
    }, 0);
  }
  
}
