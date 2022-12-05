import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { Quizz } from '../models/Quizz';

@Injectable()
export class QuizzService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    create(data: Quizz): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'quizz', params);
    }

    update(data: Quizz): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'quizz-update', params);
    }

    getquizzAll(idclase: number): Observable<any> {
        return this._http.get(this.url + 'quizz-all/' + idclase);
    }

    getQuizzOne(idquizz: number): Observable<any> {
        return this._http.get(this.url + 'quizz-one/' + idquizz);
    }

    eliminarQuizzOne(idquizz: number): Observable<any> {
        return this._http.get(this.url + 'respuestaquizz-delete/' + idquizz);
    }

}