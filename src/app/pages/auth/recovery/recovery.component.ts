import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent {

  email: string = '';
  buttonText:string = 'Enviar instrucciones';
  validateRecovery:boolean = false;

  constructor(private router: Router, private authService:AuthService) { }

  recoverPassword() {
    this.validateRecovery = true;
    this.buttonText = 'Validando...';
    if (!this.email) {
      
      alert( 'Todos los campos son obligatorios' );

      this.validateRecovery = false;
      this.buttonText = 'Enviar instrucciones';

      return;
    }
  
    if (!this._isValidEmail(this.email)) {
      
      alert( 'Correo electrónico no válido' );

      this.validateRecovery = false;
      this.buttonText = 'Enviar instrucciones';
      return;
    }

    this.authService.recovery(this.email).subscribe(
      (response) => {
        
        alert( 'Correo Eléctronico enviado exitosamente' );
        
        this.email = '';
        this.validateRecovery = false;
        this.buttonText = 'Enviar instrucciones';
      },
      (error) => {
        alert( error );
        
        this.validateRecovery = false;
        this.buttonText = 'Enviar instrucciones';
      }
    );
  }
  
  private _isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}