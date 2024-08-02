import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated = false;

  constructor(private http: HttpClient,
    private router: Router,
    private sharedService:SharedService
    ) { }

  isAuthenticatedUser(): boolean {
  
    const storedData = localStorage.getItem('token');
    return storedData !== null && storedData !== undefined;
  }

  login(username: string, password: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    // Cuerpo de la solicitud
    const data = new URLSearchParams();
    data.set('email', username);
    data.set('password', password);
    
    return this.http.post<any>(`/token`, data.toString(), { headers }).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }

  logout(): void {
    this.router.navigate(['/auth']);
    this.isAuthenticated = false;
    localStorage.removeItem('token');
  }

  recovery(email: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    // Cuerpo de la solicitud
    const data = new URLSearchParams();
    data.set('email', email);
    
    return this.http.post<any>(`/recover`, data.toString(), { headers }).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }
}