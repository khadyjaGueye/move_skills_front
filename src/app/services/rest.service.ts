import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data, Model } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class RestService<T> {

  protected url: string = "";

  constructor(private http: HttpClient) { }

  all(): Observable<Model<Data>> {
    return this.http.get<Model<Data>>(`${this.url}`);
  }

  store(data: any): Observable<Model<Data>> {
    return this.http.post<Model<Data>>(`${this.url}`, data);
  }

  show(id: string): Observable<Model<Data>> {
    return this.http.get<Model<Data>>(`${this.url}/${id}`);
  }

  update(data: any, id: number): Observable<Model<Data>> {
    return this.http.put<Model<Data>>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<Model<Data>> {
    return this.http.delete<Model<Data>>(`${this.url}/${id}`);
  }

}
