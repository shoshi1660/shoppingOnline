import { Component, EventEmitter, Input, OnChanges, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { CartModel } from 'src/app/models/cartModel';
import { ClientModel } from 'src/app/models/clientModel';
// import { ProductModel } from 'src/app/models/productsModel';
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  searchTerm: string;
  // productShow: ProductModel[];
  // itemsCart$ = this.orderService.itemsCartData$;
  itemsCart: any[] = [];
  item: any;
  // amount: number = 1;
  finallPrice: number = 0;
  clientData$ = this.authService.clientData$;
  clientData: ClientModel;
  imageUrl = "http://localhost:4000/api/products/images/";
  @Input() isShowCart: boolean;
  @Output() onOrder: EventEmitter<boolean> = new EventEmitter<boolean>();
  isOnOrder: boolean = false;
  constructor(private authService: AuthInterceptorService, private orderService: OrderService) { }

    ngOnInit(): void {
    this.clientData$.subscribe(res => {
      if (res) {
        this.clientData = res;
      }
      if (this.clientData) {
        this.orderService.itemsCartData$.subscribe(res => {
          this.itemsCart = res;
          if (res && res.length) {
            this.finallPrice = 0;
            this.itemsCart.forEach(x => this.finallPrice += x.generalPrice);
          }
        })
      }
    })
  }

  deleteProduct(indexItem: number) {
    this.orderService.deleteItem(this.itemsCart[indexItem].idItem).then(res => {
      this.itemsCart.splice(indexItem, 1);
      this.orderService.itemsCartDataSubject.next(this.itemsCart);
      if (this.itemsCart.length == 0) {
        this.finallPrice = 0
        this.orderService.deleteCart(this.orderService.cartDetails.idCart).then(res => {
          this.orderService.cartDetails = new CartModel(undefined, undefined, undefined);
        })
      };
    })
      .catch(error => {
        alert("מחיקת מוצר נכשלה, נסה מאוחר יותר")
      })
  }
  toPayment() {
    this.isOnOrder = true;
    this.onOrder.emit(true);
  }
  deleteAllProduct() {
    this.orderService.deleteAllItemsCart(this.orderService.cartDetails.idCart).then(res => {
      // console.log(res);
      this.orderService.cartDetails = new CartModel(undefined, undefined, undefined);
      this.orderService.itemsCartDataSubject.next([]);
      this.finallPrice = 0;
    })
  }
  onKeyUp(event: any) {
    this.searchTerm = event.target.value;
  }
  backToShopping() {
    this.onOrder.emit(false);
    this.isOnOrder = false;
  }
}