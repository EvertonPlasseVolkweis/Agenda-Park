import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitacoesService {

  constructor(private httpClient: HttpClient) { }

  urlBase: string = 'https://centroopera.space/api';

  getSolicitacoes(token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.httpClient.get(this.urlBase + '/usuario/naoAprovados', {headers})
  }

  recusaSolicitacao(token: String, id: number, motivo): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.httpClient.post(this.urlBase + `/usuario/recusa/${id}/${motivo}`, null, {headers})
  }

  aceitaSolicitacao(token, id: number): Observable<any> {
    const headers: any = { 'Authorization': token };  
    return this.httpClient.post(this.urlBase + `/usuario/aceitaUsuario/${id}`, null, {headers})
  }
}
