import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { ClientModel } from '../models/clientModel';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  constructor(private http: HttpClient) { };
  BASE_URL = 'http://localhost:4000/login';
  public clientDataSubject: BehaviorSubject<ClientModel> = new BehaviorSubject<ClientModel>(null);
  public clientData$: Observable<ClientModel> = this.clientDataSubject.asObservable();
  login:LoginModel = new LoginModel(undefined,undefined);

  CheckLogin(login: LoginModel): Promise<any> {
    return this.http.post('http://localhost:4000/login', login).toPromise();
  }

}  
