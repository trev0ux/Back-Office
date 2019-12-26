import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../../config';
import { IModel } from '../models/model';
import { BaseMongoService } from './base.mongo.service';

@Injectable()
export class ProfessionalService extends BaseMongoService {

  constructor(public _http: HttpClient) {
    super('profissional', _http);
  }

  precadastro(m: IModel): Observable<any> {
    debugger;
    const url = `${config.HOST}/${this.collection}`;
    return this._http.post(url, m).pipe(map(ret => ret, error => console.log(error)));
  }

  listAllDesativados(): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}/desativados`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  listAllPreCadastrados(): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}/precadastrados`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  listAllEmAvaliacao(): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}/avaliacao`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  listAllEmtreinamento(): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}/treinamento`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }


  download(fileName: string): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}/download/${fileName}`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  public downloadfile(fileName: string, type: string) {
    const url = `${config.HOST}/${this.collection}/download/${fileName}`;
    const headers = new Headers();
    headers.append('responseType', 'arraybuffer');
    return this._http.get(url,
      { responseType: 'blob' });
    //.map(res => new Blob([res],{ type: type }));
  }

  public downloadArquivos(idProfissional: string) {
    const url = `${config.HOST}/${this.collection}/downloadArquivos/${idProfissional}`;
    const headers = new Headers();
    headers.append('responseType', 'arraybuffer');
    return this._http.get(url,
      { responseType: 'blob' });
  }

  public buscarCategoryProducts() {
    const url = `${config.HOST}/categoryproduct`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }
}
