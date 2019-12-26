import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {config} from '../../config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  userLogged: any;

  constructor(private _http: HttpClient) { }

  isAuthenticated():any{
    if(localStorage.getItem('TOKEN')){
      return JSON.parse(localStorage.getItem('USER'));
    }
    return null;
  }

  logout(){
    localStorage.clear();
  }

  signIn(email, password) {

    const url = `${config.HOST}/users/login`;

    const loginData = { 'email': email,
                        'password': password,
                    };

    const excOne =  this._http.post(url, loginData).pipe(map(
        (ret) => {  // success
          console.log('excOne Data = ' + ret);
          const token = ret['token'];
          const lUser = ret['user'];

          localStorage.setItem('TOKEN', token);
          localStorage.setItem('USER', JSON.stringify(lUser) );

          return lUser;
        },
        (error: Error) => { // error
          console.log(error);
          return null;
        }
    ));

    return excOne;

  }
}
