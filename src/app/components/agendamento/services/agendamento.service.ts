import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agendamento } from '../interface/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(private httpClient: HttpClient) { }

  urlBase: string = 'https://centroopera.space/api';

  getAgendamento(token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.httpClient.get(this.urlBase + '/agenda', {headers})
  }

  getAgendamentoPorId(token: String, id): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.httpClient.get(this.urlBase + `/agenda/${id}`, {headers})
  }

  deletarAgendamento(token: String, id: number): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.httpClient.delete(this.urlBase + '/agenda/logicamente/' + id, {headers})
  }

  saveAgendamento(agenda: Agendamento, token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    const body = {agenda};

    return this.httpClient.post<any>('https://centroopera.space/api/agenda', agenda, {headers});
  }

  editaAgendamento(agenda: Agendamento, token: String, id): Observable<any> {
    const headers: any = { 'Authorization': token };
    const body = {agenda};

    return this.httpClient.put<any>(`https://centroopera.space/api/agenda/${id}`, agenda, {headers});
  }

} 
