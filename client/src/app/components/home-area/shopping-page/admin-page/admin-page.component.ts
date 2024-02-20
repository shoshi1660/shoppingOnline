import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryModel } from 'src/app/models/categoryModel';
import { ProductModel } from 'src/app/models/productsModel';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  imageUrl = "http://localhost:4000/api/products/images/";
  @ViewChild('form') form: any;
  @ViewChild('imageControl') imageControl: ElementRef;
  product: ProductModel;
  @Input() isShowCart: boolean;
  @Input('selectProduct')
  set data(selectProduct: ProductModel) {
    this.product = selectProduct;
    if (this.product.productName) {
      this.productDitails = "עדכון מוצר";
      this.showDetails = true;
      this.isUpdate = true;
    }
  }
  newImg: boolean = false;
  productDitails: string = ""
  showDetails: boolean = false;
  imageVisited: boolean = false;
  isUpdate: boolean = false;
  categories: CategoryModel[] = [];
  errors: any;
  @Output() updetOrAddProduct: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllCategories()
      .subscribe(value => {
        this.categories = value
      })
  }
  save() {
    if (this.isUpdate == false) {
      // const p = ProductModel.convertToFormData(this.product)
      this.productService.addProduct(this.product).then(res => {
        this.showDetails = false;
        this.product = new ProductModel(undefined, undefined, undefined, undefined, undefined,);
        alert("המוצר התווסף בהצלחה!");
        this.updetOrAddProduct.emit(true);
      }).catch(error => {
        // console.log(error);
      });
    }
    else {
      this.productService.update(this.product, this.product.idProduct).then(res => {
        this.showDetails = false;
        this.product = new ProductModel(undefined, undefined, undefined, undefined, undefined,);
        alert("המוצר התעכדן בהצלחה!");
        this.updetOrAddProduct.emit(true);
      }).catch(error => {
        // console.log(error);
      });
    }
  }

  saveImage(img: Event): void {
    this.product.productImage = (img.target as HTMLInputElement).files[0].name;
    this.newImg = true;
  }

  imageBlur(): void {
    this.imageVisited = true;
  }

  isAddProduct() {
    this.showDetails = true;
    this.isUpdate = false;
    this.productDitails = "הוספת מוצר חדש";
    this.product = new ProductModel(undefined, undefined, undefined, undefined, undefined,);
  }
}