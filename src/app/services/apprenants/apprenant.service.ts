import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { RestService } from '../rest.service';
import { Data } from '../../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class ApprenantService extends RestService<Data> {

  override url = environment.apiBaseUrl;

  constructor(http: HttpClient) {
    super(http);
  }
}
