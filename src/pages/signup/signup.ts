import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { LoginPage } from './../login/login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  image:string="assets/img/logobackground.png";
  login: {firstname?: string, lastname?: string, password?: string, confirpassword?:string} = {};
  submitted = false;

  constructor(public navCtrl: NavController) { }

  onNewLogin(form: NgForm) {
    this.submitted = true;

    /*
    if (form.valid) {
      this.userData.login(this.login.username);
      this.navCtrl.push(TabsPage);
    }
    */
  }

  onCancel() {
    this.navCtrl.setRoot(LoginPage);
  }
}
