import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class MapsApiService {

    private API_KEY: string;
    private API_URL: string;

    constructor(private http: Http) {
        this.API_KEY = 'AIzaSyCaHOU95Bm7H3JtD2fSaXvA_2daeQtuRJQ';
        this.API_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}&address=`;
    }

    public findFromAddress(address: string, postalCode?: string, place?: string, province?: string,
        region?: string, country?: string): Observable<any> {
        const compositeAddress = [address];

        if (postalCode) { compositeAddress.push(postalCode); }
        if (place) { compositeAddress.push(place); }
        if (province) { compositeAddress.push(province); }
        if (region) { compositeAddress.push(region); }
        if (country) { compositeAddress.push(country); }

        const url = `${this.API_URL}${compositeAddress.join(',')}`;
        return this.http.get(url).map(response => <any>response.json());
    }

    public findByCep(cep: string): any {
        return this.http.get(`http://viacep.com.br/ws/` + cep + `/json/`);
    }

}
