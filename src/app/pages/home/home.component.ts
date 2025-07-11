import { WishListService } from './../../core/service/wishList/wish-list.service';
import {
  Component,
  inject,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { ProductsService } from '../../core/service/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/service/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { icategories } from '../../shared/interfaces/icategories';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../core/search.pipe';
import { FormsModule } from '@angular/forms';
import { Ibanners } from '../../shared/interfaces/ibanners';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishListService = inject(WishListService);
  product: Iproduct[] = [];
  baseImageUrlCategory: string = 'https://ecommerce.routemisr.com/';
  banners: Ibanners[] = [];

  categories: WritableSignal<icategories[]> = signal([]);

  wishListCount: number = 0;

  cartItem: any = {};
  text: string = '';
  isWishList: boolean = false;

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
    navSpeed: 500,
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




  gitProductData():void{
    this.productsService.gitAllProduct().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.product = res.data

      }
    })
  }

  getCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
        console.log(res.data);

      },
    });
  }


  ngOnInit(): void {
    this.gitProductData();
    this.getCategoriesData();
  }

  onImageError(event: any) {
    event.target.src = 'images/errorImg.png'    ;
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

  getWishListCount(): void {
    this.wishListService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishListCount = res.data.length; // ass
      },
    })
  }

  addToWishList(id: string): void {
    this.wishListService.addProductToWishList(id).subscribe({
      next: (res) => {
        console.log(res);

        this.wishListService.wishListCount.set(res.data.length);
        this.toastrService.success(res.message, 'FRESH Cart');
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error(err.error.message, 'FRESH Cart');
      },
    });
  }
}




