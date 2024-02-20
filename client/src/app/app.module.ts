import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './components/guards/loginGuard';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/home-area/login-page/login-page.component';
import { RegistrationComponent } from './components/home-area/registration/registration.component';
import { ShoppingPageComponent } from './components/home-area/shopping-page/shopping-page.component';
import { HeaderComponent } from './components/home-area/header/header.component';
import { MyCartComponent } from './components/home-area/shopping-page/my-cart/my-cart.component';
import { PaymentComponent } from './components/home-area/shopping-page/my-cart/payment/payment.component';
import { AdminPageComponent } from './components/home-area/shopping-page/admin-page/admin-page.component';
import { HighlightSearch } from './components/pipes/HighlightSearch';

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        HomeComponent,
        RegistrationComponent,
        ShoppingPageComponent,
        LoginPageComponent,
        MyCartComponent,
        PaymentComponent,
        AdminPageComponent,
        HighlightSearch, 
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        CommonModule,
    ],
    providers: [LoginGuard],
    bootstrap: [LayoutComponent]
})
export class AppModule { }
