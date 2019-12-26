import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../../config';
import { IModel } from '../models/model';
import { BaseMongoService } from './base.mongo.service';
@Injectable()
export class UserService extends BaseMongoService {

  constructor(public _http: HttpClient) {
    super('users', _http);
  }

  saveClient(m: IModel): Observable<any> {
    debugger;
    const url = `${config.HOST}/${this.collection}/client`;
    return this._http.post(url, m).pipe(map(ret => ret, error => console.log(error)));
  }

  listAllProfessionals(): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}/professionals`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  listAllClients(): Observable<any[]> {
    const url = `${config.HOST}/${this.collection}/clients`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  activeProfessional(professional: any) {

    const url = `${config.HOST}/${this.collection}/activeProfessional`;

    const excOne = this._http.post(url, professional).pipe(map(
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

  public trocarSenha(usuario: any) {
    const url = `${config.HOST}/${this.collection}/trocarSenha`;

    const excOne = this._http.post(url, usuario).pipe(map(
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

  public validarTrocaSenha(token: any) {
    const url = `${config.HOST}/${this.collection}/validarTrocaSenha`;

    const excOne = this._http.post(url, {token: token}).pipe(map(
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

  activeCliente(id: any) {

    const url = `${config.HOST}/${this.collection}/activeClient`;

    const excOne = this._http.post(url, { idCliente: id }).pipe(map(
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

  public cadastrarCartaoPaggcerto(data: any) {
      const url = `${config.HOST}/`;
      return this._http.post(url + 'card/cadastrarCartaoClientePaggcerto', data);
  
  }

  public cadastrarCartaoFast(data: any) {
      const url = `${config.HOST}/`;
      return this._http.post(url + 'card/save', data);
  
  }

  public users() {
    const url = `${config.HOST}/${this.collection}`;
    return this._http.get(url).pipe(map((response: any) => response));
  }

  public contacts() {
    const url = `${config.HOST}/` + "chat/contacts";
    return this._http.get(url).pipe(map((response: any) => response));
  }

  public userOfficeGroups(userId: any) {
    const url = `${config.HOST}/` + "chat/groups/backoffice/" + userId;
    return this._http.get(url).pipe(map((response: any) => response));
  }

  public createGroup(data: any) {
    const url = `${config.HOST}/`;
    return this._http.post(url + 'chat/group/onetone', data);
  }

  public createSupportGroup(data: any) {
    const url = `${config.HOST}/`;
    return this._http.post(url + 'chat/group/support/backoffice', data);
  }

  public findUserContact(userId: any) {
    const url = `${config.HOST}/`;
    return this._http.get(url + 'chat/contact/' + userId).pipe(map((response: any) => response));
  }
}
