import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  public enviaEmail(email): Observable<any> {
    return this.httpClient.post<any>('https://centroopera.space/api/email', email);
  }
}
