import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    email: string = '';
    password: string = '';
    validateLogin:boolean = false;
    buttonText:string = 'Entrar';
  
    constructor(private router: Router,
                private authService: AuthService) {
      if (this.authService.isAuthenticatedUser()) {
        this.router.navigate(['/home']);
      }
    }
  
    login() {
      this.validateLogin = true;
      this.buttonText = 'Validando';
      // Validar los campos antes de enviar la solicitud
      if (this._validateForm()) {
        this.authService.login(this.email, this.password).subscribe(
          response => {
  
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('email', response.email);
            localStorage.setItem('name', response.name);
            localStorage.setItem('last_name', response.last_name);
            localStorage.setItem('rol', response.rol);
            this.authService.isAuthenticated = true;
            this.router.navigate(['/home']);
          },
          error => {
            this.validateLogin = false;
  
            alert(error);
            
            this.buttonText = 'Entrar';
          }
        );
      } else {
        this.validateLogin = false;
        this.buttonText = 'Entrar';
      }
    }
  
    private _validateForm(): boolean {
      if (!this.email || !this.password) {
        
        alert('Todos los campos deben estar llenos.');
  
        return false;
      }
    
      if (!this._isValidEmail(this.email)) {
        
        alert('El correo electrónico no es válido.');
        return false;
      }
    
      // Todos los campos están llenos y el correo electrónico es válido
      return true;
    }
    
    private _isValidEmail(email: string): boolean {
      // Validación de formato de correo electrónico usando una expresión regular
      const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    }
  }