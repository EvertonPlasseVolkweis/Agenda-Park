import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrarModel } from '../models/registrar.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  constructor(private httpClient: HttpClient) { }

  public registarUser(registrar: RegistrarModel): Observable<any> {
    return this.httpClient.post<any>('https://centroopera.space/api/usuario', registrar);
  }
}
