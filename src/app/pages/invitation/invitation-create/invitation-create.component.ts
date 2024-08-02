import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvitationCreate } from 'src/app/interface/invitation-create.interface';
import { InvitationService } from 'src/app/services/invitation.service';

@Component({
  selector: 'app-invitation-create',
  templateUrl: './invitation-create.component.html',
  styleUrls: ['./invitation-create.component.scss']
})
export class InvitationCreateComponent {

  invitationCreate: InvitationCreate = {
    name:'',
    entry_date:'',
    expiration:''
  };

  showSuccessMessage = false;
  successMessage = '';
  showErrorMessage = false;
  errorMessage = '';
  showWarningMessage = false;
  warningMessage = '';

  constructor(
    private invitationService: InvitationService, private router: Router
  ){}
  
  ngOnInit(){}

  cancel(){
    this.router.navigate(['/invitation']);
  }

  create() {
    
    if (!this.invitationCreate.name || !this.invitationCreate.entry_date || !this.invitationCreate.expiration) {
      this.showWarningMessage = true;
      this.warningMessage = 'Todos los campos son obligatorios';
      setTimeout(() => {
        this.showWarningMessage = false;
      }, 5000);
      return;
    }

    this.invitationService.create(this.invitationCreate).subscribe(
      (response) => {
        this.showSuccessMessage = true;
        this.successMessage = 'la invitación fue creada exitosamente';
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
        this.invitationCreate = {
          name:'',
          entry_date:'',
          expiration:''
        };
      },
      (error) => {
        console.error('Error al crear la invitación:', error);
        this.showErrorMessage = true;

          this.errorMessage = error;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 10000);
      }
    );
  }
}