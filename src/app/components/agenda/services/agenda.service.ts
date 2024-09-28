import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agendamento } from '../../agendamento/interface/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient) { }

  urlBase: string = 'https://centroopera.space/api';

  getAgendamentos(token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.http.get(this.urlBase + '/agenda/aprovados', {headers})
  }

  getEquipamentosAgenda(token: String, id): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.http.get(this.urlBase + `/equipamentoAgenda/idAgenda/${id}`, {headers})
  }

  editaAgenda(agenda: Agendamento, token: String, id): Observable<any> {  
    const headers: any = { 'Authorization': token };
    const body = {agenda};
    return this.http.put<any>(this.urlBase + `/agenda/${id}`, agenda, {headers});
  }

  getAgendamentosDoDia(token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.http.get(this.urlBase + '/agenda/DoDia', {headers})
  }

}
