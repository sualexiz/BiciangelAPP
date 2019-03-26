import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from '../global';
import { RequestAngel } from '../../models/requestAngel';

/*
  Generated class for the UnassignedRequestsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UnassignedRequestsProvider {

  public url:string;
  public token:any;

  constructor
  (
    public _http: Http
  )
  {
      this.url = GLOBAL.url;
      this.token = JSON.parse(localStorage.getItem('token'));
  }


  getUnassignedRequests(){
    let headers = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Bearer '+this.token.access_token
    });
    return this._http.get(this.url + 'biciangel/solicitudes-no-asignadas', {headers: headers}).map(res => res.json());
  }


  confirmRequest(model:any){
    //it will receive an array []. It needs to convert to json [] -> {}
    let json = JSON.stringify(model);
    let params = "json="+json;
    let headers = new Headers({
      'Content-Type':'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+this.token.access_token
    });

    return this._http.post(this.url+'biciangel/confirmar-solicitud?'+ params,'', {headers: headers})
             .map(res => res.json());
  }

}
