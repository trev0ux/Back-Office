import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { BaseMongoService } from './base.mongo.service';
import { SectionService } from './section.service';

@Injectable()
export class ProdutoClubService extends BaseMongoService {

  constructor(public _http: HttpClient, public sectionService: SectionService) {
    super('club/product', _http, 'yooloclubapi');
  }

  getImageProduto(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = `yooloclubapi/product/buscarImagem/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'text/csv');
    headers = headers.append('Content-Type', 'text/csv');
    return this._http.get(url, httpOptions);
  }

}
