import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/service/categories/categories.service';
import { icategories} from '../../shared/interfaces/icategories';

@Component({
  selector: 'app-categoris',
  imports: [],
  templateUrl: './categoris.component.html',
  styleUrl: './categoris.component.scss',
})
export class CategorisComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  baseImageUrl: string = 'https://apierp.verzasca.co/AppMedia/';
  categoryData: icategories[] = [];

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryData =res.data
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
