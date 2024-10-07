import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data, Model } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  url: string = "https://moovskil.tucamarketing.com/api/question1";
  constructor(private http: HttpClient) { }

  store(data: any, token: string |null):Observable<Model<Data>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ajouter le token dans l'en-tête Authorization
    });
    return this.http.post<Model<Data>>(this.url, data, { headers });
  }

}
