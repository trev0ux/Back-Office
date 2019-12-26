import { Injectable } from '@angular/core';
import { BaseMongoService } from './base.mongo.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IModel } from '../models/model';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config';

@Injectable()
export class CompanyPartnerService extends BaseMongoService {

  constructor(public _http: HttpClient) {
    super('companypartner', _http);
  }

  save(company: any) {

    const url = `${config.HOST}/companypartner`;

    const companyVO = {
                        "acessCode": company.acessCode,
                        "name": company.name,
                        "endereco": company.endereco,
                        "photoURL": company.photoURL,
                        "patternName": company.patternName,
                        "fantasyName": company.fantasyName,
                        "cnpj": company.cnpj,
                        "contacts": company.contacts,
                        "email": company.email,
                        "qtdEmployes": company.qtdEmployes,
                        "attendanceDays": company.attendanceDays,
                        "categories": company.categories,
                        "productsDiscounts": company.productsDiscounts,
                        "fastsProfessionals": company.fastsProfessionals,
                        "attendanceLocation": company.attendanceLocation,
                        "complement": company.complement,
                        "cep": company.cep,
                        "latitude": company.latitude,
                        "longitude": company.longitude,
                        "areas": company.areas,
                        'description': company.description,
                        'site': company.site,
                    };

    if (company["_id"]) {
      companyVO["_id"] = company["_id"];
    }

    const excOne =  this._http.post(url, companyVO).pipe(map(
        (ret) => {  // success
          console.log('Company saved Data = ' + ret);

          return ret;
        },
        (error: Error) => { // error
          console.log(error);
          return null;
        }
    ));

    return excOne;

  }

  listAll(): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

}
