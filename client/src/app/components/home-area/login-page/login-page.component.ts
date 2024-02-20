import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/models/clientModel';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  @ViewChild('form') form: any;
  client: LoginModel = new LoginModel(undefined, undefined);
  errors: any;
  // fd: FormData;
  auth: boolean = false;
  cart: string = "";
  productAmount: number;
  orderAmount: number;
  newClient: boolean = true;
  title: string = "";
  date: Date;
  price: string = "";
  clientData: ClientModel = new ClientModel(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,)

  @Output() guest: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private authInterceptorService: AuthInterceptorService,
    private _router: Router,) { }

  ngOnInit(): void {
    this.authInterceptorService.clientData$.subscribe(res => {
      if (res) {
        this.clientData = res;
        if (res.role == 1) {
          this._router.navigate(["shoppingPage"]);
        }
      }
      this.productService.getProductAmount()
        .subscribe(value => { this.productAmount = value[0].amount });
      this.orderService.getOrderAmount()
        .subscribe(value => { this.orderAmount = value[0].amount });
    })
    this.client = this.authInterceptorService.login;
    this.login()
  }

  login(): void {
    if (this.client.clientUserName != null && this.client.clientUserName != ''
      && this.client.clientPassword != null && this.client.clientPassword != '') {
      this.authInterceptorService
        .CheckLogin(this.client).then(
          (value) => {
            this.authInterceptorService.clientDataSubject.next(value);
            const token = value.token;
            localStorage.setItem('token', token);
            localStorage.setItem('clientName', value.clientName + " " + value);
            if (value.role != 1) {
              this.auth = true;
              this.orderService.getIfCartOpenById(value.clientIdentity).subscribe(res => {
                if (res[0].idCart != null) {
                  this.orderService.cartDetails = res[0];
                  this.cart = "המשך קניה";
                  this.title = "תאריך יצירת הסל:";
                  this.date = new Date(res[0].cartCreationDate)
                  this.price = "במחיר:  " + res[0].finallPrice + " ש'ח";
                  this.orderService.getItemsCartDetails(res[0].idCart);
                }
                else {
                  this.cart = "התחל קניה";
                  this.orderService.getOrdersDate(value.clientIdentity)
                    .subscribe((value) => {
                      if (value && value.length) {
                        this.title = " הרכישה האחרונה בוצעה בתאריך:";
                        this.date = value[0].orderDate;
                      }
                      else {
                        this.title = "ברוך הבא לקניה הראשונה שלך"
                      }
                    })
                }
              });;
            }
          })
        .catch((error) => {
          if (error) {
            alert("שם משתמש או סיסמה אינם נכונים");
          }
          this.errors = error;
        });
    };

  }
  start() {
    this._router.navigate(['shoppingPage'])
  }
  addNewClient() {
    this.newClient = true;
    this._router.navigate(['clients/add'])
  }
}
