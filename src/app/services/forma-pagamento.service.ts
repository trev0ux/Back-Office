import { Injectable } from '@angular/core';
import { BaseMongoService } from './base.mongo.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class FormaPagamentoService extends BaseMongoService {

  constructor(public _http: HttpClient) {
    super('forma-pagamento', _http);

  }

}
