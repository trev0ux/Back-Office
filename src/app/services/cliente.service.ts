import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { BaseMongoService } from './base.mongo.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClienteService extends BaseMongoService {

  constructor(public _http: HttpClient) {
    super('contracts', _http);
  }
}
