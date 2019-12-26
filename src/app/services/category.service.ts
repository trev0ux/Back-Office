import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { BaseMongoService } from './base.mongo.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService extends BaseMongoService {

  constructor(public _http: HttpClient) {
    super('categoryproduct', _http);
  }

  public getImageProduto(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = `${config.HOST}/categoryproduct/buscarImagem/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'text/csv');
    headers = headers.append('Content-Type', 'text/csv');
    return this._http.get(url, httpOptions);
  }

}
