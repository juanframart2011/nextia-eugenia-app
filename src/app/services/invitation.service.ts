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

  create(user: any): Observable<any> {

    return this.http.post(`/users`, user).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }

  delete(user: any): Observable<any> {

    return this.http.post(`/users`, user).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }

  detail(user: any): Observable<any> {

    return this.http.post(`/users`, user).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }

  edit(user: any): Observable<any> {

    return this.http.post(`/users`, user).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }
}