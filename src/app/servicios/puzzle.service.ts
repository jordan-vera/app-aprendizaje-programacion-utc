import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { Puzzle } from '../models/Puzzle';

@Injectable()
export class PuzzleService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    create(data: Puzzle): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'puzzle', params);
    }

    update(data: Puzzle): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'puzzle-update', params);
    }

    updateimagen(data: Puzzle, anterior: string): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'puzzle-update-imagen/' + anterior, params);
    }

    getpuzzleAll(idclase: number): Observable<any> {
        return this._http.get(this.url + 'puzzle-all/' + idclase);
    }

    getPuzzleOne(idpuzzle: number): Observable<any> {
        return this._http.get(this.url + 'puzzle-one/' + idpuzzle);
    }

    eliminarPuzzleOne(idpuzzle: number, imganterior: string): Observable<any> {
        return this._http.get(this.url + 'puzzle-delete/' + idpuzzle + '/' + imganterior);
    }

}