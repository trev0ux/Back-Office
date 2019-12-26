import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../../config';
import { BaseMongoService } from './base.mongo.service';

@Injectable()
export class EventService extends BaseMongoService {

  token :any;
  constructor(public _http: HttpClient) {
    super('event', _http);
  }

  listAllCorporate(): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}/corporativo`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  pesquisar(codigo: any): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}/corporativo/${codigo}`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  listItem(codigo: any): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}/corporativo/${codigo}`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  listarPayments(codigo: any): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}/payments/${codigo}`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  public buscarAgendamentosByProfissional(idProfissional): Observable<any> {
    const url = `${config.HOST}/${this.collection}/buscarAgendamentosByProfissional/${idProfissional}`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  public buscarAvaliacaoByProfissional(agendamentoId): Observable<any> {
    const url = `${config.HOST}/${this.collection}/avaliacao/${agendamentoId}`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  listEventPartner(token: any): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}/events/partner/${token}`;
    this.token = token;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  public confirmarToken(data: any) {
    const data2 ={_id: data};
    const url = `${config.HOST}/${this.collection}/confirmarToken`;
        return this._http.post(url , data2 );
    }

}
