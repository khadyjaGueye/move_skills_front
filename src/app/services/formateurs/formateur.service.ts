import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';
import { Data } from '../../interfaces/model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FormateurService extends RestService<Data> {
  override url = environment.apiBaseUrl;
  constructor(http: HttpClient) {
    super(http);
  }
}
