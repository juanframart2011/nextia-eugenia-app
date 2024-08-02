import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http: HttpClient,private sharedService:SharedService) { }

  getAll(page:number, limit:number): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    
    return this.http.get<any>(`/invitations`, { headers }).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }

  create(invitation: any): Observable<any> {

    return this.http.post(`/invitations`, invitation).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }

  delete(invitation: any): Observable<any> {

    return this.http.delete(`/invitations/${invitation}`).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }

  detail(invitation: any): Observable<any> {

    return this.http.get(`/invitations/${invitation}` ).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }

  update(invitation: any, invitationId:number): Observable<any> {

    return this.http.patch(`/invitations/${invitationId}`, invitation).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }
}