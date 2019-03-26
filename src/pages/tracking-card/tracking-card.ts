import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

//providers
import { RequestAngelProvider } from '../../providers/request-angel/request-angel';
//models
import { RequestAngel } from '../../models/requestAngel';
//components
import { TabsNavigationPage } from '../../pages/tabs-navigation/tabs-navigation';
import { EditRequestPage } from '../edit-request/edit-request';

//global
import { GLOBAL } from "../../providers/global";

/**
 * Generated class for the TrackingCardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tracking-card',
  templateUrl: 'tracking-card.html',
  providers: [RequestAngelProvider]
})
export class TrackingCardPage {

  public isEnableDescription = false;
  public requestAngelModel: Array<RequestAngel>;
  public btnSend: boolean = true;
  public url:string;


  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    //providers
    public requestAngelProvider: RequestAngelProvider
  ) {
    //model declaration
    this.requestAngelModel = new Array<RequestAngel>();
    this.url = GLOBAL.url;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingCardPage');
    this.getRequest();
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Mensaje',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


  enableDescription() {
    this.isEnableDescription = true;
  }

  cancelRequest() {
    this.btnSend = false;
    this.requestAngelModel["idUserInsert"] = JSON.parse(localStorage.getItem('userData')).id;
    this.requestAngelProvider.cancelRequest(this.requestAngelModel).subscribe(
      response => {
        if (response.code == 200) {
          this.showAlert(response.message);
          this.refresPagee();
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


  getRequest() {
    console.log("Carga getRequest()");
    this.requestAngelProvider.getRequest(JSON.parse(localStorage.getItem('userData')).id).subscribe(
      response => {
        if (response.code == 404) {
          this.showAlert(response.message);
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

  editRequest(id) {
    this.navCtrl.push(EditRequestPage, {
      idRequest: id,
    })
  }


  refresPagee() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}
