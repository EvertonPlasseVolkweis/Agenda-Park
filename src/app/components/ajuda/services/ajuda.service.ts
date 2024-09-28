import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ajuda } from '../model/ajuda';

@Injectable({
  providedIn: 'root'
})
export class AjudaService {

  constructor(private http: HttpClient) { }

  urlBase: string = 'https://centroopera.space/api';


  saveAjuda(ajuda: Ajuda, token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    const body = {ajuda};

    return this.http.post<any>('https://centroopera.space/api/ajuda', ajuda, {headers});
  }

  getInformacoes(token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.http.get(this.urlBase + '/informacoes/todos', {headers})
  }


}
