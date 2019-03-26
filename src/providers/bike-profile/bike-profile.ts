import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { GLOBAL } from '../global';
import { BikeProfile } from '../../models/bikeProfile';
import 'rxjs/add/operator/map';

/*
  Generated class for the BikeProfileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BikeProfileProvider {

  public url:string;
  public token:any;
  public user:any;

    constructor
    (
      public _http: Http
    )
    {
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.url = GLOBAL.urlsergio;
          this.token = JSON.parse(localStorage.getItem('token'));
    }
    profile(idUser){
      let headers = new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.token.access_token
      });
      return this._http.get(this.url + 'bike-profile/profile/'+idUser,{headers: headers}).map(res => res.json());
    }

}
