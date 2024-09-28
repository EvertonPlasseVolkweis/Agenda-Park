import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitacoesAgendamentoService {

  constructor(private httpClient: HttpClient) { }

  urlBase: string = 'https://centroopera.space/api';

  getSolicitacoesAgendamento(token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.httpClient.get(this.urlBase + '/agenda/naoAprovados', {headers})
  }

  recusaSolicitacaoAgendamento(token: String, id: number, motivo: string): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.httpClient.post(this.urlBase + `/agenda/recusa/${id}/${motivo}`, null, {headers})
  }

  aceitaSolicitacaoAgendamento(token, id: number): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.httpClient.post(this.urlBase + `/agenda/aceitaAgenda/${id}`, null, {headers})
  }
}
