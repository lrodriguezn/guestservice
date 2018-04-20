import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { UserService } from '../../app/core/index';
import { HomePageUser } from './../homeuser/homeuser';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  image:string="assets/img/logobackground.png";
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController,
              private userService:UserService
    ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    
    if (form.valid) {
      this.userService.login(this.login.username);
      this.navCtrl.setRoot(HomePageUser);
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
