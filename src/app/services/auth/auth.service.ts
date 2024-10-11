import { Injectable, OnInit } from '@angular/core';
import { Data, Model, UserInfo } from '../../interfaces/model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  authenticatedUser: UserInfo | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  login(user: UserInfo): Observable<Model<Data>> {
    // const url = `${environment.apiBaseUrl}/login`;
    //https://moovskil.tucamarketing.com/api/register
    const url = "https://moovskil.tucamarketing.com/api/login";
    //const url= "https://prod-moveskills.dev-illimitis.com/api/login";
    return this.http.post<Model<Data>>(url, user);
  }

  logout(id: number) {
    const url = `${environment.apiBaseUrl}/logout/${id}`;
    return this.http.get(url);
  }

  public authentificateUser(user: UserInfo, token: string): Observable<boolean> {
    this.authenticatedUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token)
    return of(true);
  }
}
