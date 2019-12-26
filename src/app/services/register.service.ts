import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { BaseMongoService } from './base.mongo.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { IModel } from '../models/model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SectionService } from './section.service';
import { Section } from '../models/section.model';
import { config } from '../../config';

@Injectable()
export class RegisterService extends BaseMongoService {

  constructor(public _http: HttpClient) {
    super('users/auth/register-jwt', _http);
  }

}
