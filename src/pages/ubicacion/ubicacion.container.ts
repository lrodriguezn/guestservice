import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { MultilingualService } from './../../app/core/services/multilingual.service';

@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.container.html'
})
export class UbicacionContainer {

  submitted: boolean = false;
  supportMessage: string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private multilingualService:MultilingualService
  ) {

  }

  submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.supportMessage = '';
      this.submitted = false;

      let toast = this.toastCtrl.create({
        message: this.multilingualService.Translate("ubicacion_send_message"),
        duration: 3000
      });
      toast.present();
    }
  }

}
