import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientModel } from '../models/clientModel';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  BASE_URL = "http://localhost:4000/api/clients";
  constructor(private http: HttpClient) { }

  getClientById(clientIdentity:number): Observable<boolean> {
    return this.http.get<boolean>(`${this.BASE_URL}/${clientIdentity}`);
  }

  add(newClient: ClientModel): Promise<any[]> {
        return this.http.post<any[]>(this.BASE_URL, newClient).toPromise();
  }

  getGeneralDateFromCart(clientIdentity: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${clientIdentity}`);
  }
  
}