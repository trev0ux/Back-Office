import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { BaseMongoService } from './base.mongo.service';
import { SectionService } from './section.service';

@Injectable()
export class ProdutoService extends BaseMongoService {

  constructor(public _http: HttpClient, public sectionService: SectionService) {
    super('product', _http);
  }

  batimento(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = `${config.HOST}/fechamento/contas/batimento`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'text/csv');
    headers = headers.append('Content-Type', 'text/csv');
    return this._http.get(url, httpOptions);
  }

  getImageProduto(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = `${config.HOST}/product/buscarImagem/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'text/csv');
    headers = headers.append('Content-Type', 'text/csv');
    return this._http.get(url, httpOptions);
  }

}
