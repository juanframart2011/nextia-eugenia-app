import { Component } from '@angular/core';
import { Invitation } from 'src/app/interface/invitation.interface';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.scss']
})
export class InvitationListComponent {

  invitations:Invitation[] = [];
  loadingInvitations:boolean = true;
  currentPage:number = 0;
  searchText:string = '';

  constructor(){

  }

  callSearch(){}

  delete(invitation:Invitation){}

  detail(invitationId:number){}

  getPages():Number[]{
    return Array(0,1,2);
  }

  goToPage(page:any){

  }

  nextPage(){}

  previousPage(){}

  totalPages():number{
    return 0;
  }
}