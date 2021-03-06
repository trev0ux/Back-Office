import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { BaseMongoService } from './base.mongo.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryClubService extends BaseMongoService {

  constructor(public _http: HttpClient) {
    super('club/categoryproduct', _http, 'yooloclubapi');
  }

  public getImageProduto(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = `${config.HOST}/categoryproductclub/buscarImagem/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'text/csv');
    headers = headers.append('Content-Type', 'text/csv');
    return this._http.get(url, httpOptions);
  }

}
