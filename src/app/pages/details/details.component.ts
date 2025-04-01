import { Iproduct } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/service/products/products.service';
import { CartService } from '../../core/service/cart/cart.service';
@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject (CartService)

  detailsProduct:Iproduct  | null = null;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        let idProduct = p.get('id') ?? '';


        this.productsService.getspecificProducts( idProduct  ).subscribe({
          next: (res)=>{
          //  this.detailsProduct = res.data;
          this.detailsProduct = res.data;
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
    })
  }


  addToCart(id: string): void {
    this.cartService.addProductCart(id).subscribe({
      next:(res)=>{
        console.log(res)
      },error:(err)=>{
        console.log(err);
      }
    })
  }
}
