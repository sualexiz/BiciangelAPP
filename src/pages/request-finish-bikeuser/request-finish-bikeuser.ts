import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//components
import { ShowRequestFinishPage } from '../../pages/show-request-finish/show-request-finish';

//providers
import { RequestAngelProvider } from '../../providers/request-angel/request-angel';
//models
import { RequestAngel } from '../../models/requestAngel';
//global
import { GLOBAL } from "../../providers/global";


@Component({
  selector: 'page-request-finish-bikeuser',
  templateUrl: 'request-finish-bikeuser.html',
  providers: [RequestAngelProvider]
})
export class RequestFinishBikeuserPage {

  public requestAngelModel: Array<RequestAngel>;
  public message:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public requestAngelProvider: RequestAngelProvider
  ) 
  {
    //model declaration
    this.requestAngelModel = new Array<RequestAngel>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestFinishBikeuserPage');
    this.getRequestFinished();
  }


  getRequestFinished() {
    console.log("Carga getUnassignedRequests()");
    this.requestAngelProvider.getFinishBikeUser(JSON.parse(localStorage.getItem('userData')).id).subscribe(
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

  showRequestFinish(id) {
    this.navCtrl.push(ShowRequestFinishPage, {
      idRequest: id
    })
  }

}
