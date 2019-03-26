import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//componentes
import { ProfilePage } from '../../pages/profile/profile';

/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
