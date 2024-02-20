import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartModel } from '../models/cartModel';
import { itemsCartModel } from '../models/itemsCartModel';
import { OrderModel } from '../models/orderModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public itemsCartDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public itemsCartData$: Observable<any[]> = this.itemsCartDataSubject.asObservable();
  cartDetails: CartModel = new CartModel(undefined, undefined, undefined);
  constructor(private http: HttpClient) { }

  getOrderAmount(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:4000/api/orders/amount`);
  }

  getOrdersDate(clientIdentity: any[]): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:4000/api/orders/orderDate/${clientIdentity}`);
  }
  addNewCart(clientIdentity: number): Observable<number> {
    return this.http.get<number>(`http://localhost:4000/api/orders/addNewCart/${clientIdentity}`);
  }

  getItemsCartDetails(idCart: number) {
    this.http.get<itemsCartModel[]>(`http://localhost:4000/api/cart/itemCart/general/date/${idCart}`).subscribe(res => {
      this.itemsCartDataSubject.next(res);
    })
  }
  getIfCartOpenById(clientIdentity: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:4000/api/cart/cartExist/${clientIdentity}`)
  }

  addCart(newCart: CartModel): Promise<any> {
    return this.http.post<any>(`http://localhost:4000/api/cart`, newCart).toPromise();
  }

  addOrder(newOrder: OrderModel): Promise<any> {
    return this.http.post<any>(`http://localhost:4000/api/orders`, newOrder).toPromise();
  }
  addItemCart(itemsCart: itemsCartModel): Promise<any> {
    return this.http.post<any>(`http://localhost:4000/api/cart/itemCart`, itemsCart).toPromise();
  }
  getTakenDates(): Observable<any> {
    return this.http.get<any>(`http://localhost:4000/api/orders/takenDates`);
  }

  deleteItem(idItem: number): Promise<any> {
    return this.http.delete(`http://localhost:4000/api/cart/${idItem}`).toPromise();
  }
  deleteAllItemsCart(idCart: number): Promise<any> {
    return this.http.delete(`http://localhost:4000/api/cart/allItem/${idCart}`).toPromise();
  }

  deleteCart(idCart: number): Promise<any> {
    return this.http.delete(`http://localhost:4000/api/cart/onlyCart/empty/${idCart}`).toPromise();
  }
  update(item: itemsCartModel, idItem: number): Promise<any> {
    return this.http.put(`http://localhost:4000/api/cart/${idItem}`, item).toPromise();
  }
}
