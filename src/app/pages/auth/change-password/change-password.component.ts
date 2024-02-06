import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  private token:string = '';
  password:string = '';
  repassword:string = '';
  buttonText:string = 'Cambiar Contraseña';
  validateRecovery:boolean = false;

  constructor(
    private router: Router,private route: ActivatedRoute,private userService: UserService
  ){}
  
  ngOnInit(){
    this.route.params.subscribe(params => {
      
      this.token = params['token'];
    });
  }

  recovery() {
    this.validateRecovery = true;
    this.buttonText = 'Validando';
    // Validar los campos antes de enviar la solicitud
    if (this._validateForm()) {
      this.userService.changePassword(this.token, this.password).subscribe(
        response => {

          alert('Contraseña cambiada exitosamente');
          setTimeout(() => {
            this.router.navigate(['/auth']);
          }, 5000);
          
          this.token = '';
          this.password = '';
          this.repassword = '';
          
          this.validateRecovery = false;
          this.buttonText = 'Cambiar Contraseña';
        },
        error => {
          alert( error );
          this.buttonText = 'Cambiar Contraseña';
        }
      );
    } else {
      this.validateRecovery = false;
      this.buttonText = 'Cambiar Contraseña';
    }
  }

  private _validateForm(): boolean {
    if (!this.repassword || !this.password) {
      alert( 'Todos los campos deben estar llenos.' );

      return false;
    }

    if (this.repassword != this.password) {
      
      alert( 'Las contraseñas son diferentes' );

      return false;
    }
  
    // Todos los campos están llenos y el correo electrónico es válido
    return true;
  }
}