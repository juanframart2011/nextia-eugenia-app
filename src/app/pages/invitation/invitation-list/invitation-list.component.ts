import { Component } from '@angular/core';
import { Invitation } from 'src/app/interface/invitation.interface';
import { InvitationService } from 'src/app/services/invitation.service';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.scss']
})
export class InvitationListComponent {

  invitations:Invitation[] = [];
  invitationsAll:Invitation[] = [];
  loadingInvitations:boolean = true;
  currentPage:number = 0;
  searchText:string = '';
  limit:number = 10;
  totalPages:number = 0;

  constructor(private invitationService:InvitationService){}

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

  delete(invitation:Invitation){}

  detail(invitationId:number){}

  getPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  
  goToPage(page: number) {
    this.currentPage = page;
  }
}