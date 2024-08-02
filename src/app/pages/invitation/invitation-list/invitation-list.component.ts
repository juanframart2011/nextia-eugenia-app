import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Invitation } from 'src/app/interface/invitation.interface';
import { InvitationService } from 'src/app/services/invitation.service';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.scss'],
  providers: [DatePipe]
})
export class InvitationListComponent {

  invitations:Invitation[] = [];
  invitationsAll:Invitation[] = [];
  loadingInvitations:boolean = true;
  currentPage:number = 0;
  searchText:string = '';
  limit:number = 10;
  totalPages:number = 0;

  constructor(private invitationService:InvitationService,private datePipe: DatePipe, private router: Router){}

  private _getList(){
    this.invitationService.getAll( this.currentPage, this.limit ).subscribe((data)=>{
      
      this.invitations = data.results;
      this.invitationsAll = this.invitations;
      this.totalPages = data.total;
      this.loadingInvitations = false;
    });
  }

  private _search(){
    
    this.invitations = this.invitationsAll.filter((invitation) => {
      
      const searchLower = this.searchText.toLowerCase();
      const nameMatch = invitation.name.toLowerCase().includes(searchLower);
      const entrada = invitation.entry_date.toLowerCase().includes(searchLower);
      
      // Retorna true si alguna de las comprobaciones es verdadera
      return nameMatch || entrada;
    });
  }

  private _sendDelete(id:number){

    this.invitationService.delete(id).subscribe(
      response => {
        alert( 'invitación Eliminada exitosamente' );
        setTimeout(() => {
          this._getList();
        }, 5000);
      },
      error => {
        console.warn( '_sendDelete() => ', error );
      }
    );
  }

  ngOnInit(){
    this._getList();
  }

  callSearch(){
    
    if( this.searchText ){
      this._search();
    }
    else{
      this.invitations = this.invitationsAll;
    }
  }

  delete(invitation:Invitation){

    var entry_date = this.datePipe.transform(invitation.entry_date, 'yyyy-MM-dd HH:mm:ss');

    var userConfirmed = confirm('¿Estás seguro de eliminar la invitación: '+invitation.name+', de entrada: '+entry_date+' ?');

    if(userConfirmed) {
      
      this._sendDelete(invitation.id);
    }
  }

  detail(invitationId:number){
    this.router.navigate(['/invitation/edit', invitationId]);
  }

  getPages(): number[] {
    const pages = [];
    for (let i = 1; i <= (this.totalPages/this.limit); i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
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

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}