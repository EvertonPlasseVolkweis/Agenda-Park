import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laboratorio } from '../model/laboratorio';

@Injectable({
  providedIn: 'root'
})
export class LaboratoriosService {

  constructor(private http: HttpClient) { }

  urlBase: string = 'https://centroopera.space/api';

  getLaboratorios(token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.http.get(this.urlBase + '/laboratorio', {headers})
  }

  getLaboratoriosPorId(token: String, id): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.http.get(this.urlBase + `/laboratorio/${id}`, {headers})
  }

  deletarLaboratorios(token: String, id: number): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.http.delete(this.urlBase + '/laboratorio/logicamente/' + id, {headers})
  }

  saveLaboratorios(laboratorio: Laboratorio, token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    const body = {laboratorio};

    return this.http.post<any>(this.urlBase + '/laboratorio', laboratorio, {headers});
  }

  editaLaboratorio(laboratorio: Laboratorio, token: String, id): Observable<any> {
    const headers: any = { 'Authorization': token };
    const body = {laboratorio};

    return this.http.put<any>(this.urlBase + `/laboratorio/${id}`, laboratorio, {headers});
  }
}
