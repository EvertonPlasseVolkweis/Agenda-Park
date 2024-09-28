import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlBase: string = 'https://centroopera.space/api';

  constructor(private httpClient: HttpClient) { }

  public getUsuarios(token: String): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.httpClient.get(this.urlBase + '/usuario', {headers})
  }

  public editarNivelUsuario(token, id, nivelAcesso): Observable<any> {
    const headers: any = { 'Authorization': token };
    return this.httpClient.put(this.urlBase + `/usuario/alteraNivelAcesso/${id}/${nivelAcesso}`, null, {headers})
  }
}

