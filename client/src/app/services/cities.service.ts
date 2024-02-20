import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CitiesModel } from '../models/citiesModel';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  BASE_URL = "http://localhost:4000/api/cities";
  constructor(private http: HttpClient) { }

  getAllCities(): Observable<CitiesModel[]> {
    return this.http.get<CitiesModel[]>(`${this.BASE_URL}`);
  }
}
