import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private sharedService:SharedService) { }

  changePassword(token: string,password:string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    // Cuerpo de la solicitud
    const data = new URLSearchParams();
    data.set('token', token);
    data.set('password', password);
    
    return this.http.post<any>(`/change-password`, data.toString(), { headers }).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }

  create(user: any): Observable<any> {

    return this.http.post(`/users`, user).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }
}