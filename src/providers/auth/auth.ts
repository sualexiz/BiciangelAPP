import { Injectable } from '@angular/core';
import {  Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from '../global';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public url:string;
  public token:any;
  public access_token:any;

  constructor
  (
    public _http: Http
  )
  {
      this.url = GLOBAL.url;
      this.token = JSON.parse(localStorage.getItem('token'));

      if(this.token)
      {
        this.access_token = this.token.access_token;
      }
      else{
        this.access_token = "";
      }

  }


  login(model:any){
    //it will receive an array []. It needs to convert to json [] -> {}
    let json1 = Object.assign({}, model);
    let json = JSON.stringify(json1);
    let params = "json="+json;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.post(this.url+'login?'+ params, {headers: headers})
             .map(res => res.json());
  }


  //retorna respuesta si el usuario esta autenticado o no
  isLogged(){
    let headers = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Bearer '+this.access_token
    });

    console.log(this.url+'validar/usuario');
    return this._http.post(this.url+'validar/usuario','', {headers: headers})
             .map(res => res.json());                   
  }

}
