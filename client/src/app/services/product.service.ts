import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/categoryModel';
import { ProductModel } from '../models/productsModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  BASE_URL = "http://localhost:4000/api/products";

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>("http://localhost:4000/api/products");
  }

  getProductById(idProduct: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`http://localhost:4000/api/products/${idProduct}`);
  }

  getProductAmount(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:4000/api/products/amount`);
  }

  getProductByIdCategory(idCategory: any): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`http://localhost:4000/api/products/idCategory/${idCategory}`);
  }

  getSearchProduct(str: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`http://localhost:4000/api/products/searchProduct/${str}`)
  }

  getAllCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`http://localhost:4000/api/products/all/categories`)
  }

  addProduct(newProduct: ProductModel): Promise<any> {
    return this.http.post(this.BASE_URL, newProduct).toPromise();
  }

  update(updatedProduct: ProductModel,id:number): Promise<any> {
    return this.http.put(`http://localhost:4000/api/products/${id}`, updatedProduct).toPromise();
  }

}
