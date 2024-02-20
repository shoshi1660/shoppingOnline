import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CitiesModel } from 'src/app/models/citiesModel';
import { ClientModel } from 'src/app/models/clientModel';
import { OrderModel } from 'src/app/models/orderModel';
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';
import { CitiesService } from 'src/app/services/cities.service';
import { OrderService } from 'src/app/services/order.service';
import { DomSanitizer } from '@angular/platform-browser';
import { itemsCartModel } from 'src/app/models/itemsCartModel';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('form') form: any;
  @ViewChild('ccNumber') ccNumberField: ElementRef;
  today = new Date().toISOString().split('T')[0];
  newOrder: OrderModel = new OrderModel(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);;
  errors: any;
  cities: CitiesModel[];
  clienData: ClientModel;
  @Input() finallPrice: number;
  takenDates: string[] = [];
  availableDate: boolean = true;
  takenDatesWarn: string = "";
  fileUrl: any;
  itemsCart$ = this.orderService.itemsCartData$;
  itemsCart: any[] = [];
  items: itemsCartModel[] = [];
  data: string = "";
  succesOrder: boolean = false;
  constructor(private citiesService: CitiesService,
    private orderService: OrderService,
    private authServicr: AuthInterceptorService,
    private rout: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.citiesService.getAllCities()
      .subscribe(value => this.cities = value);
    this.authServicr.clientData$.subscribe(res => {
      this.clienData = res;
    })
    this.orderService.getTakenDates().subscribe((res) => {
      res.forEach((x: any) => {
        this.takenDates.push(x.shipingDate.toString());
      })
    })
    this.itemsCart$.subscribe(res => {
      if (res) {
        this.itemsCart = res;
        this.itemsCart.forEach(x => {
          this.data += "שם מוצר: " + x.productName + ", מחיר: " + x.productPrice + ", כמות: " + x.ProductQuantity + ";             "
        });
        const blob = new Blob([this.data], { type: 'application/octet-stream' });
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      }
    })
    this.data += "סה'כ: " + this.finallPrice
  }
  order() {
    this.newOrder.clientIdentity = this.clienData.clientIdentity;
    this.newOrder.finalPrice = this.finallPrice;
    this.newOrder.idCart = this.orderService.cartDetails.idCart;
    this.newOrder.fourLastDigits = this.newOrder.fourLastDigits.slice(this.newOrder.fourLastDigits.length - 4, this.newOrder.fourLastDigits.length)
    this.newOrder.orderDate = new Date();
    this.orderService.addOrder(this.newOrder).then((res) => {
      this.succesOrder = true;
      this.orderService.itemsCartDataSubject.next([]);
    }
    ).catch((error) => {
      // console.log(error);
      alert("בצוע ההזמנה נכשל :(, מצטערים נסה שוב מאוחר יותר");
    });
  }
  endOrder() {
    this.rout.navigate(['home'])
  }
  ondbClick() {
    this.newOrder.idCity = this.clienData.idCity;
    this.newOrder.street = this.clienData.street;
  }
  changeDate(event: any) {
    this.availableDate = true;
    this.takenDatesWarn = "";
    this.takenDates.forEach(x => {
      if (x.includes(event.target.value)) {
        this.availableDate = false;
        this.takenDatesWarn = "עליך לבחור יום אחר, כל המשלוחים תפוסים";
      }
    })

  }
}