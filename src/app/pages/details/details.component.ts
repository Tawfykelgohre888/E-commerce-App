import { Iproduct } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/service/products/products.service';
import { CartService } from '../../core/service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  detailsProduct: Iproduct | null = null;

  ngOnInit(): void {
    // Subscription to the route params
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const idProduct = params.get('id') ?? ''; // Get the product ID from the URL
        if (idProduct) {
          this.fetchProductDetails(idProduct); // Fetch product details if ID is valid
        }
      },
      error: (err) => {
        console.log('Error while reading route params:', err);
      },
    });
  }

  fetchProductDetails(idProduct: string): void {
    // Fetch the product details using the product service
    // this.productsService.getspecificProducts(idProduct).subscribe({
    //   next: (response) => {
    //     this.detailsProduct = response.data; // Store the product details
    //   },
    //   error: (err) => {
    //     console.log('Error fetching product details:', err);
    //   },
    // });
  }

  addToCart(id: string): void {
    // Add the product to the cart
    this.cartService.addProductCart(id).subscribe({
      next: (response) => {
        console.log('Product added to cart:', response);
        // Optionally: Show a success message to the user
        this.toastrService.success(response.message, 'FRESH Cart');
      },
      error: (err) => {
        console.log('Error adding product to cart:', err);
        // Optionally: Show an error message to the user
        this.toastrService.error(err.error.message, 'FRESH Cart');
      },
    });
  }
}
