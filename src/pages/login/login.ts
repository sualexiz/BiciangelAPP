import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Events } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

//providers
import { GLOBAL } from '../../providers/global';



//componentes biciangeles
import { DashboardPage } from '../dashboard/dashboard';
import { MyApp } from '../../app/app.component';
//modelo usuario biciangeles
import { User } from '../../models/user';
//provider biciangeles
import { AuthProvider } from '../../providers/auth/auth';



@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
  providers: [AuthProvider]
})
export class LoginPage {
  login: FormGroup;
  main_page: { component: any };
  loading: any;
  public btnSend: boolean;
  public userModel: Array<User>;
  public isLogin: boolean = true;
  public url:string = GLOBAL.url;


  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController,
    public events: Events,
  ) {
    this.main_page = { component: TabsNavigationPage };

    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    //declaracion modelo
    this.userModel = new Array<User>();
    this.btnSend = true;
  }

  doLogin() {
    this.btnSend = false;
    //console.log(this.requestAngelModel);
    this.authProvider.login(this.userModel).subscribe(
      response => {
        if (response.code == 200) {
          this.nav.setRoot(DashboardPage);
          this.userModel = response.user;
          //guardar el response en el localstorage
          localStorage.setItem('userData', JSON.stringify(response.user));
          localStorage.setItem('token', JSON.stringify(response.token));
          //sacar el localstorage recien creado
          var userDataEvent = JSON.parse(localStorage.getItem('userData'));
          //Crear evento enviando el userData. Este lo recibira el app.component.ts.
          //se hace con el propostio de que el menu sea visible
          this.events.publish('user:created', userDataEvent);

          //console.log(response);
        } else {
          this.showAlert(response.message);
          this.btnSend = true;
          console.log(response);
        }
      },
      error => {
        //console.log(<any>error);
        
        console.log(error);
        if(error.status == 401)
        {
          let erro = JSON.parse(error._body);
          this.showAlert(erro.message);
        }
        
        this.btnSend = true;
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


}