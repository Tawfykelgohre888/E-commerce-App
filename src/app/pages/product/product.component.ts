import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from './../../core/service/products/products.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/service/categories/categories.service';
import { CartService } from '../../core/service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Icategories } from '../../shared/interfaces/icategories';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [RouterLink,  SearchPipe, FormsModule ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  // product: Iproduct[] = [];

  Product: WritableSignal<Iproduct[]> = signal([]);

  // categories: Icategories[] = [];

  categories: WritableSignal<Icategories[]> = signal([]);

  cartItem: any = {};

  text: string = '';

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    nav: false,
    items: 1,
  };
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };
  getProductData(): void {
    this.productsService.getAllProduct().subscribe({
      next: (res) => {
        this.Product.set(res.data);
        // this.cartService.cartCount.next(res.numOfCartItems);
      },
    });
  }
  getCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      },
    });
  }
  ngOnInit(): void {
    this.getProductData();
    this.getCategoriesData();
  }

  addToCart(id: string): void {
    this.cartService.addProductCart(id).subscribe({
      next: (res) => {
        console.log(res);

        this.cartService.cartCount.set(res.numOfCartItems);
        // console.log(this.cartService.cartCount);

        this.toastrService.success(res.message, 'FRESH Cart');
      },
    });
  }
}
