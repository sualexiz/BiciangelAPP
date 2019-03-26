import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App, ToastController, Events } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Observable } from 'rxjs/Observable';

import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { FormsPage } from '../pages/forms/forms';
import { LayoutsPage } from '../pages/layouts/layouts';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { SettingsPage } from '../pages/settings/settings';
import { ProfilePage } from '../pages/profile/profile';
import { FunctionalitiesPage } from '../pages/functionalities/functionalities';
//bikeangels
import { RequestAngelPage } from '../pages/request-angel/request-angel';
import { TrackingCardPage } from '../pages/tracking-card/tracking-card';
import { RequestsPage } from '../pages/requests/requests';
import { UnassignedRequestsPage } from '../pages/unassigned-requests/unassigned-requests';
import { RequestFinishedPage } from '../pages/request-finished/request-finished';
import { RequestFinishBikeuserPage } from '../pages/request-finish-bikeuser/request-finish-bikeuser';
import { Deeplinks } from '@ionic-native/deeplinks';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
//providers
import { AuthProvider } from '../providers/auth/auth';
//global
import { GLOBAL } from "../../providers/global";

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

//obtener los datos de usuario del localstorage
var userData = JSON.parse(localStorage.getItem('userData'));

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  providers: [AuthProvider]
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  public userData: any;

  public requestAngel: any;
  public islogin:boolean=false;


  // make WalkthroughPage the root (or first) page

  //si el usuario no esta autenticado debe ir al login. Si no se redirige al dashboard
  rootPage: any = userData == null ? LoginPage : DashboardPage;
  // rootPage: any = FunctionalitiesPage;
  // rootPage: any = TabsNavigationPage;
  textDir: string = "ltr";

  pages: Array<{ title: any, icon: string, component: any }>;
  pushPages: Array<{ title: any, icon: string, component: any }>;

  constructor(
    platform: Platform,
    public menu: MenuController,
    public app: App,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public translate: TranslateService,
    public toastCtrl: ToastController,
    private deeplinks: Deeplinks,
    public events: Events,
    public authProvider: AuthProvider
  ) {

    //validar si el usuario esta logeado. Si no lo esta se redirige a login
    this.validateLoggedUser();

    translate.setDefaultLang('es');
    translate.use('es');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.styleDefault();
    });

    //este evento es para cuando el usuario inicia sesion y evitar
    //que tenga que refrescar toda la aplicacion para ver los
    //items del menu. Es la unica forma de refrescar el menu despues de iniciar sesion
    //inmediatamente  esta esperando en el metodo login.ts en el metodo doLogin
    //que un evento sea ejecutado. isLogin es boolean. Enviara un true cuando haga login
    //se realiza de esta manera ya que es la unica de refrescar el menu en el appcomponent
    events.subscribe('user:created', (userDataEvent) => {
      //menu del biciusuario
      console.log(userDataEvent);
      this.fillMenu(userDataEvent);
    });

    //cuando el usuario esta logueado
    //verificar que no este vacio
    if(userData != null)
    {
      this.fillMenu(userData);
    }

  }

  //validar si el usuario esta autenticado
  validateLoggedUser() {
    this.authProvider.isLogged().subscribe(
      response => {

      },
      error => {
        //esta es la exepcion que recibe cuando el usuario no esta autenticado.
        //las exepciones siempre se redirigen aqui
        if(error.status == 401)
        {
          this.nav.setRoot(LoginPage);
        }
      }
    );
  }


  fillMenu(user)
  {
    if (user.roles["0"]["name"] == "bikeuser") {
      this.pages = [
        { title: "Mi perfil", icon: 'contact', component: ProfilePage },
        { title: "Solicitar", icon: 'bicycle', component: RequestAngelPage },
        { title: "Seguimiento", icon: 'photos', component: TrackingCardPage },
        { title: "Terminados", icon: 'close-circle', component: RequestFinishBikeuserPage }
      ];
    }
    else if (user.roles["0"]["name"] == "Biciangel") {
      this.pages = [

        { title: "Mi perfil", icon: 'contact', component: ProfilePage },
        { title: "Sin asignar", icon: 'body', component: UnassignedRequestsPage },
        { title: "Asignadas", icon: 'people', component: RequestsPage },
        { title: "Terminados", icon: 'close-circle', component: RequestFinishedPage }
      ];
    }
  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  pushPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
    this.app.getRootNav().push(page.component);
  }

  //salir de sesion
  logout() {
    localStorage.removeItem("userData");
    this.nav.setRoot(LoginPage);
    this.menu.close();
  }
}
