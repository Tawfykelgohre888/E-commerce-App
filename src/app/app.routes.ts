import { AllOrdersComponent } from './pages/all-orders/all-orders.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { logindGuard } from './core/guards/logind.guard';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },

    {
        path: "", component: AuthLayoutComponent, canActivate: [logindGuard], children: [
            { path: "login", loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: "Login" },
            { path: "register", loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: "Register" },
            { path: "forgetPassword", loadComponent: () => import('./pages/forget-psssword/forget-psssword.component').then(m => m.ForgetPssswordComponent), title: "Forget Password" },
        ]
    },
    
    {
        path: "", component: BlankLayoutComponent, children: [
            { path: "home", loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: "Home" }, // Home not authGuard
            { path: "product", loadComponent: () => import('./pages/product/product.component').then(m => m.ProductComponent), title: "Product"},
            { path: "categories", loadComponent: () => import('./pages/categories/categoris.component').then(m => m.CategorisComponent), title: "Categories"},
            { path: "brands", loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), title: "Brands"},
            { path: "cart", loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), title: "Cart"},
            { path: "wishList", loadComponent: () => import('./pages/wish-list/wish-list.component').then(m => m.WishListComponent), title: "wishList"},
            // { path: "details/:id", loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), title: "Details"},
            { path: "checkout/:id", loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), title: "Checkout"},
            { path: "allorders", loadComponent: () => import('./pages/all-orders/all-orders.component').then(m => m.AllOrdersComponent), title: "allorders"}
        ]
    },

    // صفحة الـ 404
    { path: "**", loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent), title: "Not Found" }
];