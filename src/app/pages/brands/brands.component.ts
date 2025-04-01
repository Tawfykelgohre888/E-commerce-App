import { BrandsService } from './../../core/service/brands/brands.service';
import { Component, inject, OnInit } from '@angular/core';
import { Ibrands } from '../../shared/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  brandsData: Ibrands[] = [];

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.brandsService.getAllPrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brandsData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
