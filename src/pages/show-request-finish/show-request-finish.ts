import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//providers
import { RequestAngelProvider } from '../../providers/request-angel/request-angel';
//models
import { RequestAngel } from '../../models/requestAngel';
//global
import { GLOBAL } from "../../providers/global";


@Component({
  selector: 'page-show-request-finish',
  templateUrl: 'show-request-finish.html',
  providers: [RequestAngelProvider]
})
export class ShowRequestFinishPage {

  public requestAngelModel: Array<RequestAngel>;

  public idRequest: number;
  public rol: string;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public requestAngelProvider: RequestAngelProvider
  ) {
    //obtain the parameter
    this.idRequest = navParams.get("idRequest");
    this.rol = navParams.get("rol");
    //model declaration
    this.requestAngelModel = new Array<RequestAngel>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowRequestFinishPage');
    this.showRequestFinish();
  }


  showRequestFinish() {
    console.log("Carga showRequestFinish()");
    this.requestAngelProvider.showRequestFinished(this.idRequest).subscribe(
      response => {
        if (response.code == 404) {
          this.requestAngelModel = response.data;
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


}
