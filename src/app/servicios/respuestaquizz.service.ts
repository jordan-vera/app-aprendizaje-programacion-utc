import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { Respuestaquizz } from '../models/Respuestaquizz';

@Injectable()
export class RespuestaquizzService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    create(data: Respuestaquizz): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'respuestaquizz', params);
    }

    update(data: Respuestaquizz): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'respuestaquizz-update', params);
    }

    getrespuestaquizzAll(idquizz: number): Observable<any> {
        return this._http.get(this.url + 'respuestaquizz-all/' + idquizz);
    }

    getRespuestaQuizzOne(idrespuesta: number): Observable<any> {
        return this._http.get(this.url + 'respuestaquizz-one/' + idrespuesta);
    }

    eliminarRespuestaQuizzOne(idrespuesta: number): Observable<any> {
        return this._http.get(this.url + 'respuestaquizz-delete/' + idrespuesta);
    }

    eliminarRespuestaQuizzAll(idquizz: number): Observable<any> {
        return this._http.get(this.url + 'respuestaquizz-delete-all/' + idquizz);
    }

}