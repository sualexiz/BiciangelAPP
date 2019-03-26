import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//providers
import { BikeProfileProvider } from '../../providers/bike-profile/bike-profile';
//models
import { BikeProfile } from '../../models/bikeProfile';
//global
import { GLOBAL } from "../../providers/global";
import 'rxjs/Rx';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html',
  providers: [BikeProfileProvider]

})
export class ProfilePage {

  public profile:Array<BikeProfile>;
  public message:string;
  public user:any;

  constructor(
    public navParams: NavParams,
    //providers
    public bikeProfileProvider: BikeProfileProvider
  )
  {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.profile = new Array<BikeProfile>();
  }
  getProfile() {
    console.log("Carga getProfile()");

    this.bikeProfileProvider.profile(JSON.parse(localStorage.getItem('userData')).id).subscribe(
// el response es la respuesta json
      response => {
        if (response.code == 404) {
          this.profile = response.data;
          this.message = response.message;
        } else {
          this.profile = response.data;
          console.log(this.profile);
        }
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  ionViewDidLoad() {
    this.getProfile();
  }



}
