import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipamento } from './equipamentos';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  constructor(private http: HttpClient) { }

  urlBase: string = 'https://centroopera.space/api';

  getEquipamento(token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.http.get(this.urlBase + '/equipamento', {headers})
  }

  getEquipamentoPorId(token: String, id): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.http.get(this.urlBase + `/equipamento/${id}`, {headers})
  }

  deletarEquipamento(token: String, id: number): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.http.delete(this.urlBase + '/equipamento/logicamente/' + id, {headers})
  }

  saveEquipamento(equipamento: Equipamento, token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    const body = {equipamento};

    return this.http.post<any>('https://centroopera.space/api/equipamento', equipamento, {headers});
  }

  editaEquipamento(equipamento: Equipamento, token: String, id): Observable<any> {
    const headers: any = { 'Authorization': token };
    const body = {equipamento};

    return this.http.put<any>(`https://centroopera.space/api/equipamento/${id}`, equipamento, {headers});
  }

}
