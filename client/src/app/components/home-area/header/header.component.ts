import { Component , OnInit } from '@angular/core';
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  guest: string = "אורח";
  clientData$ = this.authService.clientData$;

  constructor(private authService: AuthInterceptorService) { }

  ngOnInit(): void {
    this.clientData$.subscribe(res => {
      if (res) {
        this.guest = res.clientName + " " + res.clientLastName;
      }
    })
  }
}
