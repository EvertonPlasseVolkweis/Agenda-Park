import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestLogin } from '../models/login.mode';
import { RespostaLogin } from '../models/respostaLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public realizaLogin(requestLogin: RequestLogin): Observable<any> {
    return this.httpClient.post<any>('https://centroopera.space/api/usuario/authenticar', requestLogin)
  }
} 
