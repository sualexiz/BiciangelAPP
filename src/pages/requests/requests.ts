import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,App } from 'ionic-angular';

//providers
import { RequestAngelProvider } from "../../providers/request-angel/request-angel";
import { LocationAccuracy } from '@ionic-native/location-accuracy';
//models
import { RequestAngel } from "../../models/requestAngel";
//global
import { GLOBAL } from "../../providers/global";
//plugin
import { Geolocation } from '@ionic-native/geolocation';
//import { LocationAccuracy } from '@ionic-native/location-accuracy';


/**
 * Generated class for the RequestsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
  providers: [RequestAngelProvider]
})
export class RequestsPage {

  public requestAngelModel: Array<RequestAngel>;
  public bikeAngel: number;
  public btnSend: boolean = true;
  public confirm: boolean = false;
  public isCancel:boolean = false;
  public message: string;

  constructor
    (
    public navCtrl: NavController,
    public navParams: NavParams,
    public requestAngelProvider: RequestAngelProvider,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    private locationAccuracy: LocationAccuracy,
    public appCtrl: App,
  ) {
    //model declaration
    this.requestAngelModel = new Array<RequestAngel>();
    //declaration bikeAngel
    this.requestAngelModel["idBikeAngel"] = JSON.parse(localStorage.getItem('userData')).bike_angel.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestsPage');
    this.getAssignedRequests();
  }

  getAssignedRequests() {

    console.log("Carga getUnassignedRequests()");
    this.requestAngelProvider.getAssignedRequest(JSON.parse(localStorage.getItem('userData')).bike_angel.id).subscribe(
      response => {
        if (response.code == 404) {
          this.requestAngelModel = response.data;
          this.message = response.message;
        } else {
          //verificar si hay una solicitud en curso para mostrarla y no mostrar las asignadas.
          this.requestAngelModel = response.data.filter(item => item.statuses_id === 9);
          //si no hay solicitudes en curso se muestran todas las asignadas
          if (this.requestAngelModel.length == 0) {
            this.requestAngelModel = response.data;
          }
          console.log(this.requestAngelModel);
        }
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  startTrack(id) {

    this.btnSend = false;
    var model = {
      id: id,
      idBikeAngel: JSON.parse(localStorage.getItem('userData')).bike_angel.id,
      latitude_start: this.requestAngelModel["0"]["latitude_start"],
      longitude_start: this.requestAngelModel["0"]["longitude_start"]
    };
    this.requestAngelProvider.startTrack(model).subscribe(
      response => {
        if (response.code == 200) {
          this.confirm = false;
          this.getAssignedRequests();
          this.showAlert(response.message);
          this.btnSend = true;
          console.log(response);
        } else {
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


  getGps(id) {
    let env = this,
      _loading = env.loadingCtrl.create();

    _loading.present();

    this.geolocation.getCurrentPosition().then((resp) => {
      this.requestAngelModel["0"]["latitude_start"] = resp.coords.latitude;
      this.requestAngelModel["0"]["longitude_start"] = resp.coords.longitude;

      //the method is finished with dismiss
      _loading.dismiss();
      this.startTrack(id);

    }).catch((error) => {
      console.log('Error getting location', error);
      //_loading.dismiss();
    });

  }

  requestGps(id, action) {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if (canRequest) {
        if (action == "startTrack") {
          // the accuracy option will be ignored by iOS
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () => this.getGps(id),
            error => alert("Error obteniendo la ubicacion. Posiblemente no permitio activar el gps " + error)
          );
        }
        else {
          // the accuracy option will be ignored by iOS
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () => this.getGpsFinish(id),
            error => alert("Error obteniendo la ubicacion. Posiblemente no permitio activar el gps " + error)
          );
        }
      }else{
        this.activeLocationOfCelphone();
      }
    });
  }

  //si el servicio de ubicacion esta activado se pregunta al usuario que lo active
  activeLocationOfCelphone()
  {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  }


  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Mensaje',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  accept() {
    this.confirm = true;
  }

  cancel() {
    this.confirm = false;
  }


  getGpsFinish(id) {
    let env = this,
      _loading = env.loadingCtrl.create();

    _loading.present();

    this.geolocation.getCurrentPosition().then((resp) => {
      this.requestAngelModel["0"]["latitude_finish"] = resp.coords.latitude;
      this.requestAngelModel["0"]["longitude_finish"] = resp.coords.longitude;
      this.requestAngelModel["0"]["id"] = id;


      //the method is finished with dismiss
      _loading.dismiss();
      this.finishTrack(id);

    }).catch((error) => {
      console.log('Error getting location', error);
      //_loading.dismiss();
    });

  }


  finishTrack(id) {
    this.btnSend = false;
    this.getKilometros();
    var model = {
      id: id,
      idBikeAngel: JSON.parse(localStorage.getItem('userData')).bike_angel.id,
      latitude_finish: this.requestAngelModel["0"]["latitude_finish"],
      longitude_finish: this.requestAngelModel["0"]["longitude_finish"],
      kilometers_traveled: this.requestAngelModel["0"]["kilometers_traveled"]
    };
    this.requestAngelProvider.finishTrack(model).subscribe(
      response => {
        if (response.code == 200) {
          this.confirm = false;
          this.getAssignedRequests();
          this.showAlert(response.message);
          this.btnSend = true;
          console.log(response);
        } else {
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


  getKilometros() {
    var rad = function (x) { return x * Math.PI / 180; }
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad(this.requestAngelModel["0"]["latitude_finish"] - this.requestAngelModel["0"]["latitude_start"]);
    var dLon1g = rad(this.requestAngelModel["0"]["longitude_finish"] - this.requestAngelModel["0"]["longitude_start"]);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(this.requestAngelModel["0"]["latitude_start"])) * Math.cos(rad(this.requestAngelModel["0"]["latitude_finish"])) * Math.sin(dLon1g / 2) * Math.sin(dLon1g / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    d = (d * 100) / 100;

    this.requestAngelModel["0"]["kilometers_traveled"] = d.toFixed(4);
  }


  cancelRequest() {
    this.requestAngelProvider.cancelRequest(this.requestAngelModel["0"]).subscribe(
      response => {
        if (response.code == 200) {
          this.confirm = false;
          this.appCtrl.getRootNav().push(RequestsPage);
          this.showAlert(response.message);
          this.btnSend = true;
          console.log(response);
        } else {
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


  enableCancel()
  {
    this.isCancel = true;
  }


  cancelRequestBikeAngel(id) {
    var model = {
      id: id,
      observationCancel : this.requestAngelModel["0"]["observationCancel"],
      idUserInsert : JSON.parse(localStorage.getItem('userData')).id
    };
    this.btnSend = false;
    this.requestAngelProvider.cancelRequestBikeAngel(model).subscribe(
      response => {
        if (response.code == 200) {
          this.confirm = false;
          this.getAssignedRequests();
          this.showAlert(response.message);
          //console.log(response.message);
          this.btnSend = true;
          console.log(response);
        } else {
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


}
