import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Predio } from './predio';

@Injectable({
  providedIn: 'root'
})
export class PredioService {

  constructor(private http: HttpClient) { }

  urlBase: string = 'https://centroopera.space/api';

  getPredio(token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.http.get(this.urlBase + '/predio', {headers})
  }

  getPredioPorId(token: String, id): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.http.get(this.urlBase + `/predio/${id}`, {headers})
  }

  deletarPredio(token: String, id: number): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.http.delete(this.urlBase + '/predio/logicamente/' + id, {headers})
  }

  savePredio(predio: Predio, token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    const body = {predio};
    return this.http.post<any>(this.urlBase + '/predio', predio, {headers});
  }

  editaPredio(predio: Predio, token: String, id): Observable<any> {
    const headers: any = { 'Authorization': token };
    const body = {predio};
    return this.http.put<any>(this.urlBase + `/predio/${id}`, predio, {headers});
  }

  //
  // updatePredio() {

  //   return this.http.post('/updatePredio')
  // }

}
