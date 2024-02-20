import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './components/guards/loginGuard';
import { LoginPageComponent } from './components/home-area/login-page/login-page.component';
import { RegistrationComponent } from './components/home-area/registration/registration.component';
import { ShoppingPageComponent } from './components/home-area/shopping-page/shopping-page.component';


const routes: Routes = [
    {
        path: "clients/add",
        component: RegistrationComponent
    },
    {
        path: "home",
        component: LoginPageComponent,
    },
    {
        path: "shoppingPage",
        component: ShoppingPageComponent,
        canActivate: [LoginGuard]
    },
    {
        path: '',
        component: LoginPageComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
