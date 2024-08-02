import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvitationCreate } from 'src/app/interface/invitation-create.interface';
import { Invitation } from 'src/app/interface/invitation.interface';
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

  invitationCreated!: Invitation;

  showSuccessMessage:boolean = false;
  successMessage:string = '';
  showErrorMessage:boolean = false;
  errorMessage:string = '';
  showWarningMessage:boolean = false;
  warningMessage:string = '';
  isSubmitForm:boolean = false;
  buttonSubmitText:string = 'Guardar';
  isModalOpen: boolean = false;

  constructor(
    private invitationService: InvitationService, private router: Router
  ){}
  
  ngOnInit(){}

  cancel(){
    this.router.navigate(['/invitation']);
  }

  closeModal() {
    // Oculta el modal
    this.isModalOpen = false;
    document.body.style.overflow = ''; // Opcional: restaurar el desplazamiento de la página
  }

  create() {
    
    this.buttonSubmitText = 'Guardando';
    this.isSubmitForm = true;
    if (!this.invitationCreate.name || !this.invitationCreate.entry_date || !this.invitationCreate.expiration) {
      this.showWarningMessage = true;
      this.warningMessage = 'Todos los campos son obligatorios';
      this.isSubmitForm = false;
      this.buttonSubmitText = 'Guardar';
      setTimeout(() => {
        this.showWarningMessage = false;
      }, 5000);
      return;
    }

    this.invitationService.create(this.invitationCreate).subscribe(
      (response) => {
        this.invitationCreated = response;
        this.showSuccessMessage = true;
        this.successMessage = 'la invitación fue creada exitosamente';
        this.isSubmitForm = false;
        this.buttonSubmitText = 'Guardar';
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
        this.invitationCreate = {
          name:'',
          entry_date:'',
          expiration:''
        };

        this.isModalOpen = true;
        document.body.style.overflow = 'hidden';
      },
      (error) => {
        console.error('Error al crear la invitación:', error);
        this.showErrorMessage = true;
        this.buttonSubmitText = 'Guardar';

        this.isSubmitForm = false;
          this.errorMessage = error;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 10000);
      }
    );
  }

  openQrInNewTab(base64Data:string) {
    
    var byteCharacters = atob(base64Data.split(',')[1]);
    var byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], { type: 'image/png' });

    var objectURL = URL.createObjectURL(blob);

    window.open(objectURL, '_blank');
  }
}