import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { MultilingualService } from './../../app/core/services/multilingual.service';

@Component({
  selector: 'page-reclamos',
  templateUrl: 'quejas.container.html'
})
export class QuejasReclamosPage {

  submitted: boolean = false;
  supportMessage: string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private multilingualService:MultilingualService
  ) {

  }

  ionViewDidEnter() {
    /*
    let toast = this.toastCtrl.create({
      message: 'This does not actually send a support request.',
      duration: 3000
    });
    toast.present();
    */
  }

  submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.supportMessage = '';
      this.submitted = false;

      let toast = this.toastCtrl.create({
        message: this.multilingualService.Translate("reclamos_send_message"),
        duration: 3000
      });
      toast.present();
    }
  }
}
