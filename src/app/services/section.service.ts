import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { BaseMongoService } from './base.mongo.service';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class SectionService extends BaseMongoService {

  constructor(public _http: HttpClient) {
    super('section', _http);
  }

}
