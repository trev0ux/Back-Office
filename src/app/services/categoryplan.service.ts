import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { BaseMongoService } from './base.mongo.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryPlanService extends BaseMongoService {

  constructor(public _http: HttpClient) {
    super('categoryplan', _http);
  }


}
