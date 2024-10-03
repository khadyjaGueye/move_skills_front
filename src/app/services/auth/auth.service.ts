import { Injectable, OnInit } from '@angular/core';
import { User, UserAuth } from '../../interfaces/model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  authenticatedUser: User | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  login(user: User): Observable<UserAuth> {
    const url = `${environment.apiBaseUrl}/login`;
    return this.http.post<UserAuth>(url, user);
  }

  logout(id: number) {
    const url = `${environment.apiBaseUrl}/logout/${id}`;
    return this.http.get(url);
  }

  public authentificateUser(user: User, token: string): Observable<boolean> {
    this.authenticatedUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token)
    return of(true);
  }
}
