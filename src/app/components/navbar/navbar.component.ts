import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  appName:string = environment.name;

  constructor(private authService: AuthService) {}

  logout(){

    this.authService.logout()
  }
}