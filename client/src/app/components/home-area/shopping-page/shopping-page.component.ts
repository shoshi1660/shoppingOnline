import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/models/productsModel';
import { itemsCartModel } from 'src/app/models/itemsCartModel';
import { OrderService } from 'src/app/services/order.service';
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';
import { CartModel } from 'src/app/models/cartModel';
import { ClientModel } from 'src/app/models/clientModel';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {
  itemsCart$ = this.orderService.itemsCartData$;
  products: ProductModel[];
  productShow: ProductModel[];
  selectProduct: ProductModel = new ProductModel(undefined, undefined, undefined, undefined, undefined);
  itemsCart: any[] = [];
  amount: number = 1;
  finallPrice: number = 0;
  onOrder: boolean = false;
  isShowCart: boolean = true;
  searchStr: string;
  imageUrl = "http://localhost:4000/api/products/images/";
  cartShow: boolean;
  admin: boolean = false;
  clientData$ = this.authService.clientData$;
  clientData: ClientModel = new ClientModel(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)
  
  constructor(private productService: ProductService, private orderService: OrderService, private authService: AuthInterceptorService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.itemsCart$.subscribe(res => {
      this.itemsCart = res;
    })
    this.clientData$.subscribe(res => {
      this.clientData = res;
      if (res.role == 1) {
        this.admin = true;
      }
    })
  }

  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe(value => {
        this.products = value;
        this.productShow = this.products;
      });
  }

  filterProduct(idCategory: number = null) {
    if (!idCategory) {
      this.getAllProducts();
    }
    else {
      this.productService.getProductByIdCategory(idCategory)
        .subscribe(value => {
          this.productShow = value;
        })
    }
  }
  openProductDetails(product: ProductModel) {
    this.selectProduct = product;
  }
  showCart() {
    this.isShowCart = !this.isShowCart;
  };

  addToCart() {
    if (this.orderService.cartDetails.idCart == undefined) {
      const cart: CartModel = {
        idCart: null,
        clientIdentity: this.clientData.clientIdentity,
        cartCreationDate: new Date(),
      }
      this.orderService.addCart(cart)
        .then(res => {
          this.orderService.cartDetails = res;
          this.orderService.getIfCartOpenById(cart.clientIdentity);
          this.addItem();
        })
        .catch(error => {
          error
        });

    }
    else {
      this.addItem();
    }
  }
  addItem() {
    const product = {
      idItem: 0,
      generalPrice: (this.amount * this.selectProduct.productPrice),
      productName: this.selectProduct.productName,
      idProduct: this.selectProduct.idProduct,
      productPrice: this.selectProduct.productPrice,
      productImage: this.selectProduct.productImage,
      ProductQuantity: this.amount
    }
    const item = this.itemsCart.find(x => x.idProduct == product.idProduct);
    if (item == null) {
      const a: itemsCartModel = ({
        idItem: null, idProduct: product.idProduct, ProductQuantity: product.ProductQuantity,
        generalPrice: (product.ProductQuantity * product.productPrice), idCart: this.orderService.cartDetails.idCart
      })
      this.orderService.addItemCart(a).then(res => {
        product.idItem = res.idItem;
        this.itemsCart.push(product);
        this.orderService.itemsCartDataSubject.next(this.itemsCart);
      }).catch(error => {
        alert("הוספת נמוצר נכשלה, אנא נסה מאוחר יותר");
      })
    }
    else {
      item.ProductQuantity = item.ProductQuantity + this.amount;
      item.generalPrice = product.productPrice * item.ProductQuantity;
      this.orderService.update(item, item.idItem)
        .then(res => {
          this.finallPrice += (product.generalPrice * this.amount);
          this.orderService.itemsCartDataSubject.next(this.itemsCart);
        })
        .catch(error => {
          alert("הוספת נמוצר נכשלה, אנא נסה מאוחר יותר");

        })
   }
   this.amount = 1;
  }
  cancelation() {
    this.amount = 1;
  }
  searchProduct() {
    this.productService.getSearchProduct(this.searchStr)
      .subscribe(res => {
        this.productShow = res;
      })
  }
  GetOnOrder(event: any) {
    this.onOrder = event;
  }
  GetupdetOrAddProduct(event: boolean) {
    if (event) {
      this.getAllProducts()
    }
  }
}
