import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { Codigo } from '../models/Codigo';

@Injectable()
export class CodigoService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    create(data: Codigo): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'codigo', params);
    }

    getcodigos(idclase: number): Observable<any> {
        return this._http.get(this.url + 'codigos/' + idclase);
    }

    getcodigoOne(idprograma: number): Observable<any> {
        return this._http.get(this.url + 'codigo-one/' + idprograma);
    }

    eliminarAllCodigos(idprograma: number): Observable<any> {
        return this._http.get(this.url + 'codigo-delete/' + idprograma);
    }

}