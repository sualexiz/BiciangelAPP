import { Component } from '@angular/core';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

//components
import { TrackingCardPage } from '../../pages/tracking-card/tracking-card';
import { LoginPage } from '../../pages/login/login';

//providers
import { RequestAngelProvider } from '../../providers/request-angel/request-angel';
import { AuthProvider } from '../../providers/auth/auth';
//models
import { RequestAngel } from '../../models/requestAngel';
//global
import { GLOBAL } from "../../providers/global";

/**
 * Generated class for the RequestAngelPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-request-angel',
  templateUrl: 'request-angel.html',
  providers: [
    RequestAngelProvider,
    AuthProvider
  ]
})
export class RequestAngelPage {

  public idUser: string;
  public canRequestAngel: boolean;
  public requestAngelModel: Array<RequestAngel>;
  public addMode:boolean = true;
  public borrar:any;

  event_form: FormGroup;
  public btnSend = true;
  public maxDate = "2050-01-01";
  public minDate = new Date().toISOString();
  
  constructor(
    public nav: NavController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    //providers
    public requestAngelProvider: RequestAngelProvider,
    public authProvider: AuthProvider
  ) {
    //model declaration
    this.requestAngelModel = new Array<RequestAngel>();
    //important. Whithout this the ngModel of ion datetime won't work in validation FormGroup
    this.requestAngelModel['take_date'] = new Date().toISOString();
    this.requestAngelModel['time_start'] = new Date().toISOString();
    this.requestAngelModel['idUserInsert'] = JSON.parse(localStorage.getItem('userData')).id;

 
    this.event_form = new FormGroup({

      accompanimentDate: new FormControl(new Date().toISOString(), Validators.required),
      timeStart: new FormControl(new Date().toISOString(), Validators.required),
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

  
  requestAngel() {
    this.btnSend = false;
    //console.log(this.requestAngelModel);
    this.requestAngelProvider.requestAngel(this.requestAngelModel).subscribe(
      response => {
        if (response.code == 200) {
          this.showAlert(response.message);
          this.navCtrl.setRoot(TrackingCardPage);
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

  validateCreateRequest() {
    this.requestAngelProvider.validateCreateRequest(JSON.parse(localStorage.getItem('userData')).id).subscribe(
      response => {
        if (response.code == 500) {
          this.canRequestAngel = false;
          this.showAlert(response.message);
        } else {
          this.canRequestAngel = true;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  ionViewDidLoad()
  {
    this.validateCreateRequest();
  }


}


