import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from '../global';
import { RequestAngel } from '../../models/requestAngel';


/*
  Generated class for the RequestAngelProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RequestAngelProvider {

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

    //validar si el biciusuario no tiene otra solicitud y puede crear una
    validateCreateRequest(idUser){
      let headers = new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.token.access_token
      });
      return this._http.get(this.url + 'biciusuario/validar-solicitud/'+idUser, {headers: headers}).map(res => res.json());
    }

    //biciusuario que cancela una solicitud 
    cancelRequest(requestAngelModel: RequestAngel[]){
      console.log(requestAngelModel);
      let json = JSON.stringify(requestAngelModel);
      let params = "json="+json;
      let headers = new Headers({
        'Content-Type':'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.token.access_token
      });
  
      return this._http.post(this.url+'biciusuario/cancelar-solicitud?'+ params,'', {headers: headers})
               .map(res => res.json());
    }

    //detalles de una solicitud de un biciusuario
    getRequest(idUser){
      let headers = new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.token.access_token
      });
      return this._http.get(this.url + 'biciusuario/solicitud/'+idUser, {headers: headers} ).map(res => res.json());
    }


    //biciusuario que solicita un biciangel
    requestAngel(requestAngelModel: RequestAngel[]){
      //it will receive an array []. It needs to convert to json [] -> {}
      let json1 = Object.assign({}, requestAngelModel);
      let json = JSON.stringify(json1);
      let params = "json="+json;
      let headers = new Headers({
        'Content-Type':'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.token.access_token
      });
  
      return this._http.post(this.url+'biciusuario/solicitar-biciangel?'+ params,'', {headers: headers})
               .map(res => res.json());
    }
    
    //biciusuario que edita una solicitud
    editRequest(idRequest){
      let headers = new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.token.access_token
      });
      return this._http.get(this.url + 'biciusuario/editar-solicitud/'+idRequest, {headers: headers}).map(res => res.json());
    }
    

    //biciusuario que actualiza una solicitud
    updateRequest(requestAngelModel: RequestAngel[]){
      let json = JSON.stringify(requestAngelModel);
      let params = "json="+json;
      let headers = new Headers({
        'Content-Type':'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.token.access_token
      });
      return this._http.post(this.url+'biciusuario/actualizar-solicitud?'+ params,'', {headers: headers})
               .map(res => res.json());
    }

    //solicitudes asignadas a un biciangel
    getAssignedRequest(idBikeAngel){
      let headers = new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.token.access_token
      });
      return this._http.get(this.url + 'biciangel/solicitudes-asignadas/'+idBikeAngel, {headers: headers}).map(res => res.json());
    }

    

    //mostrar detalles de la solicitud finalizada
    showRequestFinished(idrequest){
      let headers = new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.token.access_token
      });
      return this._http.get(this.url + 'biciusuario-biciangel/solicitud-finalizada/'+idrequest, {headers: headers}).map(res => res.json());
    }

    //mostrar solicitudes finalizadas por un biciusuario
    getFinishBikeUser(idrequest){
      let headers = new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.token.access_token
      });
      return this._http.get(this.url + 'biciusuario/solicitudes-finalizadas/'+idrequest, {headers: headers}).map(res => res.json());
    }

    //biciangel que ve sus solicitudes finalizadas
    getRequestFinished(idBikeAngel){
      let headers = new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.token.access_token
      });
      return this._http.get(this.url + 'biciangel/solicitudes-finalizadas/'+idBikeAngel, {headers: headers}).map(res => res.json());
    }

    //biciangel que inicia recorrido
    startTrack(model:any){
      let json = JSON.stringify(model);
      let params = "json="+json;
      let headers = new Headers({
        'Content-Type':'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.token.access_token
      });
  
      return this._http.post(this.url+'biciangel/iniciar-recorrido?'+ params,'', {headers: headers})
               .map(res => res.json());
    }

    //biciangel que finaliza recorrido
    finishTrack(model:any){
      let json = JSON.stringify(model);
      let params = "json="+json;
      let headers = new Headers({
        'Content-Type':'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.token.access_token
      });
  
      return this._http.post(this.url+'biciangel/finalizar-recorrido?'+ params,'', {headers: headers})
               .map(res => res.json());
    }

    //biciangel que cancela solicitud
    cancelRequestBikeAngel(model:any){
      let json = JSON.stringify(model);
      let params = "json="+json;
      let headers = new Headers({
        'Content-Type':'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.token.access_token
      });
      return this._http.post(this.url+'biciangel/cancelar-solicitud?'+ params,'', {headers: headers})
               .map(res => res.json());
    }

}
