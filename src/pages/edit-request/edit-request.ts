import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

//components
import { TrackingCardPage } from "../tracking-card/tracking-card";
//global
import { GLOBAL } from "../../providers/global";

/**
 * Generated class for the EditRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 //providers
import { RequestAngelProvider } from '../../providers/request-angel/request-angel';
//models
import { RequestAngel } from '../../models/requestAngel';


@Component({
  selector: 'page-edit-request',
  templateUrl: '../request-angel/request-angel.html',
})
export class EditRequestPage {

  public idUser: string = "3";
  public canRequestAngel: boolean;
  public editMode: boolean = true;
  public requestAngelModel: Array<RequestAngel>;
  public idRequest:number;
  public datepipe: DatePipe;
  public myDate:any;

  event_form: FormGroup;
  public btnSend = true;
  public maxDate = "2050-01-01";
  public minDate = new Date().toISOString();


  constructor(
    public nav: NavController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    //providers
    public requestAngelProvider: RequestAngelProvider
  ) {
    //obtain the parameter
    this.idRequest = navParams.get("idRequest");
    //model declaration
    this.requestAngelModel = new Array<RequestAngel>();
    this.requestAngelModel['idUserInsert'] = JSON.parse(localStorage.getItem('userData')).id;

 
    this.event_form = new FormGroup({
      accompanimentDate: new FormControl(this.requestAngelModel["take_date"],Validators.required),
      timeStart: new FormControl(this.requestAngelModel["time_start"], Validators.required),
      address: new FormControl('', Validators.required),
      addressFinish: new FormControl('', Validators.required),
      description: new FormControl(''),
    });

  }


  validation_messages = {
    'address': [
      { type: 'required', message: 'La direccion de salida es requerida' },
    ],
    'addressFinish': [
      { type: 'required', message: 'La direccion de llegada es requerida' },
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRequestPage');
    this.editRequest();
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Mensaje',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  editRequest() {
    console.log("Carga editRequest()");
    this.requestAngelProvider.editRequest(this.idRequest).subscribe(
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
  

  updateRequest() {
    this.btnSend = false;
    //console.log(this.requestAngelModel);
    this.requestAngelProvider.updateRequest(this.requestAngelModel).subscribe(
      response => {
        if (response.code == 200) {
          this.showAlert(response.message);
          this.nav.setRoot(TrackingCardPage);
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
