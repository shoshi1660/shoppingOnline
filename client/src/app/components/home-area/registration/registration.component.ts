import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CitiesModel } from 'src/app/models/citiesModel';
import { ClientModel } from 'src/app/models/clientModel';
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';
import { CitiesService } from 'src/app/services/cities.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('form') form: any;
  newClient: ClientModel = new ClientModel(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  errors: any;
  idExist: string = "";
  cities: CitiesModel[];
  stepTwo: boolean = false;
  isPassword: boolean = false;
  isValidID: boolean = false;
  constructor(private clientService: ClientService,
    private citiesService: CitiesService,
    private authService: AuthInterceptorService,
    private route: Router) { }

  ngOnInit(): void {
    this.citiesService.getAllCities()
      .subscribe(value => this.cities = value);
  }

  onAdd(): void {
    this.clientService.add(this.newClient)
      .then(
        (res) => {
          this.authService.login.clientUserName = this.newClient.clientUserName;
          this.authService.login.clientPassword = this.newClient.clientPassword;
               this.route.navigate(["home"]);
          this.newClient = new ClientModel(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
          this.form.reset();
        })
      .catch((error) => {
        if (error?.error.includes("Duplicate")) {
          alert((error.error.includes("clientUserName") ? "שם משתמש" : "סיסמא") + " קיים ");
        }
             
        this.errors = error
      });
  }
  toStepTwo() {
    this.clientService.getClientById(this.newClient.clientIdentity)
      .subscribe(res => {
        this.stepTwo = !res
        if (res) {
          this.idExist = "מ.ז קיים במערכת";
        }
        else
          this.idExist = "";
      })
  }
  checkPassword(event: any) {
    if (event.value == this.newClient.clientPassword) {
      this.isPassword = true;
    }
  }
  checkIdentity(event: any) {
    let value = String(event.target.value).trim();
    this.isValidID = Array.from(value, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }) % 10 === 0;
  }
}