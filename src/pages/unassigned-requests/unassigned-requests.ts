import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

//providers
import { UnassignedRequestsProvider } from "../../providers/unassigned-requests/unassigned-requests";
//models
import { RequestAngel } from "../../models/requestAngel";
//global
import { GLOBAL } from "../../providers/global";


@Component({
  selector: 'page-unassigned-requests',
  templateUrl: 'unassigned-requests.html',
  providers: [UnassignedRequestsProvider]
})
export class UnassignedRequestsPage {

  public requestAngelModel: Array<RequestAngel>;
  public bikeAngel:number;
  public btnSend:boolean = true;
  public confirm:boolean = false;
  public message:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public unassignedRequestsProvider: UnassignedRequestsProvider,
    public alertCtrl: AlertController,
    
  ) 
  {
    //model declaration
    this.requestAngelModel = new Array<RequestAngel>();
    //declaration bikeAngel
    this.requestAngelModel["idBikeAngel"] = JSON.parse(localStorage.getItem('userData')).bike_angel.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnassignedRequestsPage');
    this.getUnassignedRequests();
  }


  getUnassignedRequests() {
    console.log("Carga getUnassignedRequests()");
    this.unassignedRequestsProvider.getUnassignedRequests().subscribe(
      response => {
        if (response.code == 404) {
          this.requestAngelModel = response.data;
          this.message = response.message;
        } else {
          this.requestAngelModel = response.data;
          console.log(this.requestAngelModel);
        }
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  confirmRequest(id) {
    this.btnSend = false;
    var model = {
      id: id,
      idBikeAngel: JSON.parse(localStorage.getItem('userData')).bike_angel.id
   };
    this.unassignedRequestsProvider.confirmRequest(model).subscribe(
      response => {
        if (response.code == 200) {
          this.getUnassignedRequests();
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

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Mensaje',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  accept()
  {
    this.confirm = true;
  }

  cancel()
  {
    this.confirm = false;
  }

}
