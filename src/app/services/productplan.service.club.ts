import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { BaseMongoService } from './base.mongo.service';
import { SectionService } from './section.service';

@Injectable()
export class ProductPlanClubService extends BaseMongoService {

  constructor(public _http: HttpClient, public sectionService: SectionService) {
    super('club/productplan', _http, 'yooloclubapi');
  }

}
