import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { MultilingualService } from './../../app/core/services/multilingual.service';

@Component({
  selector: 'page-atencioncliente',
  templateUrl: 'atencioncliente.container.html'
})
export class AtencionClienteContainer {

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
        message: this.multilingualService.Translate("antencioncliente_send_message"),
        duration: 3000
      });
      toast.present();
    }
  }

}
