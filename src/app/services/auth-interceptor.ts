import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('AQUI NO INTERCEPTOR >>>>> $$$#### >>>');
        if (localStorage.getItem('TOKEN') !== undefined && localStorage.getItem('TOKEN') !== undefined) {
            return next.handle(req.clone({
                setHeaders: {
                    'authorization': 'bearer ' + localStorage.getItem('TOKEN')
                }
            }));
        } else {
            return next.handle(req);
        }
    }
}
