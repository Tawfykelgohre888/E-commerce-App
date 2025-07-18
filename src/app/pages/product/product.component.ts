import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from './../../core/service/products/products.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/service/categories/categories.service';
import { CartService } from '../../core/service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { icategories } from '../../shared/interfaces/icategories';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/search.pipe';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [RouterLink, SearchPipe, FormsModule,CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  product: Iproduct[] = [];
  // baseImageServer: string = 'https://apierp.verzasca.co/AppMedia/';
  // Product: WritableSignal<Iproduct[]> = signal([]);

  // categories: Icategories[] = [];

  categories: WritableSignal<icategories[]> = signal([]);

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

  getAllProduct():void{
    this.productsService.gitAllProduct().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.product = res.data
      },error:(err)=>{
        console.log(err);

      }
    })
  }

  // getProductData(): void {
  //   this.productsService.getServiceIsMostwanted().subscribe({
  //     next: (res) => {
  //       console.log(res.data);

  //       this.product = res.data;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
  ngOnInit(): void {
    // this.getProductData();
    // this.getCategoriesData();
    this.getAllProduct();
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
