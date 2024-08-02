import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  invitationId!:number;

  constructor(
    private invitationService: InvitationService, private router: Router,private route: ActivatedRoute
  ){}
  
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.invitationId = params['id'];
      this.buttonSubmitText = 'Modificar';
      this._getDetail(this.invitationId);
    });
  }

  private _create() {
    
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

  private _formatDateForDateTimeLocal(dateString: string): string {
    // Crea un objeto Date a partir del string ISO
    const date = new Date(dateString);
    
    // Extrae la fecha y la hora en formato YYYY-MM-DDTHH:MM
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  private _getDetail(id:number){
    this.invitationService.detail(id).subscribe(
      response => {
        this.invitationCreate = response;
        this.invitationCreate.entry_date = this._formatDateForDateTimeLocal(response.entry_date);
        this.invitationCreate.expiration = this._formatDateForDateTimeLocal(response.expiration);
      },
      error => {
        console.warn( '_getDetail() => ', error );
      }
    );
  }

  private _update() {
    
    this.buttonSubmitText = 'Modificando';
    this.isSubmitForm = true;
    if (!this.invitationCreate.name || !this.invitationCreate.entry_date || !this.invitationCreate.expiration) {
      this.showWarningMessage = true;
      this.warningMessage = 'Todos los campos son obligatorios';
      this.isSubmitForm = false;
      this.buttonSubmitText = 'Modificar';
      setTimeout(() => {
        this.showWarningMessage = false;
      }, 5000);
      return;
    }

    this.invitationService.update(this.invitationCreate,this.invitationId).subscribe(
      (response) => {
        this.invitationCreated = response;
        this.showSuccessMessage = true;
        this.successMessage = 'la invitación fue creada exitosamente';
        this.isSubmitForm = false;
        this.buttonSubmitText = 'Modificar';
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);

        this.isModalOpen = true;
        document.body.style.overflow = 'hidden';
      },
      (error) => {
        console.error('Error al modificar la invitación:', error);
        this.showErrorMessage = true;
        this.buttonSubmitText = 'Modificar';

        this.isSubmitForm = false;
          this.errorMessage = error;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 10000);
      }
    );
  }

  cancel(){
    this.router.navigate(['/invitation']);
  }

  closeModal() {
    // Oculta el modal
    this.isModalOpen = false;
    document.body.style.overflow = ''; // Opcional: restaurar el desplazamiento de la página
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

  submitForm(){

    if(this.invitationId){
      this._update();
    }
    else{
      this._create();
    }
  }
}