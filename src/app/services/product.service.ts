import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { BaseMongoService } from './base.mongo.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService extends BaseMongoService {

  constructor(public _http: HttpClient) {
    super('product', _http);
  }
}
