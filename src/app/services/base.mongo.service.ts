import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IModel } from '../models/model';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config';

export class BaseMongoService {
  collection: string;
  hostSlave: string;

  constructor(collection: string,
    public _http: HttpClient, public host?: string) {
    this.collection = collection;
    this.hostSlave = host;
  }

  listAll(): Observable<any[]> {
    const url = `${this.hostSlave || config.HOST}/${this.collection}`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }

  getOne(m: IModel): Observable<any[]> {
    const url = `${this.hostSlave ||config.HOST}/${this.collection}/${m._id}`;
    return this._http.get(url).pipe(
      map((response: any) => response));
  }


  add(m: IModel): Observable<any> {
    debugger;
    const url = `${this.hostSlave || config.HOST}/${this.collection}`;
    return this._http.post(url, m).pipe(map(ret => ret, error => console.log(error)));
  }

  remove(m: IModel) :Observable<any>{
    const url = `${this.hostSlave || config.HOST}/${this.collection}/${m._id}`;

    return of(this._http.delete(url).toPromise()
      .then(
      (ret) => {
        return m;
      },
      (error: Error) => {
        console.log(error);
        return null;
      }
      ));
  }

  update(m: IModel) {
    const url = `${this.hostSlave || config.HOST}/${this.collection}/${m._id}`;

    return of(this._http.put(url, m).toPromise()
      .then(
        (ret) => {
        return m;
      },
      (error: Error) => {
        console.log(error);
        return null;
      }
      ));

  }
}
