
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage,
         SignupPage,
          SupportPage,
          TutorialPage
          } from '../index';

import { EnterpriseListPage } from './../../app/core/component/enterprises/list/list.enterprise';
import { MultilingualService } from './../../app/core/services/multilingual.service';

@Component({
  selector: 'page-homepublic',
  templateUrl: 'homepublic.html'
})
export class HomePagePublic {
  image:string="assets/img/logobackground.png";

  constructor(public navCtrl: NavController, private multilingualService:MultilingualService) {}

/*
  signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    console.log("Facebook display name ",this._auth.displayName());
    this.user=this._auth.displayName();
  }  
*/

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  onLogin() {
    console.log("ok onLogin");
    this.navCtrl.push(LoginPage);
  }

  onSupport() {
    this.navCtrl.push(SupportPage);
  }

  onEnterprisesTour() {
    this.navCtrl.push(EnterpriseListPage);
  }

  onLanguage()
  {
    console.log("ok");
    this.multilingualService.showAlertLanguage();
  }

  onTutorial()
  {
    this.navCtrl.push(TutorialPage);
  }  
}
 