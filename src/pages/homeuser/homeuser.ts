import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {  RoomServiceContainer,
          llamadasContainer,
          QuejasReclamosPage,
          MensajesContainer,
          UbicacionContainer,
          AtencionClienteContainer,
          SugerenciasPage,
          EstadoCuentaContainer,
          ZeusOnlineContainer
          } from '../index';

import { MultilingualService } from './../../app/core/services/multilingual.service';

@Component({
  selector: 'page-homeuser',
  templateUrl: 'homeuser.html'
})
export class HomePageUser {
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

  onRoomService() {
    this.navCtrl.push(RoomServiceContainer);
  }

  onMensajes() {
    this.navCtrl.push(MensajesContainer);
  }

  onEstadoCuenta() {
    this.navCtrl.push(EstadoCuentaContainer);
  }

  onllamadas() {
    this.navCtrl.push(llamadasContainer);
  }

  onZeusReservas() {
    this.navCtrl.push(ZeusOnlineContainer);
  }

  onSugerencias() {
    this.navCtrl.push(SugerenciasPage);
  }

  onReclamos() {
    this.navCtrl.push(QuejasReclamosPage);
  }

  onAtencionCliente() {
    this.navCtrl.push(AtencionClienteContainer);
  }

  onEmpresa() {
    this.navCtrl.push(QuejasReclamosPage);
  }

  onUbicacion() {
    this.navCtrl.push(UbicacionContainer);
  }

}
 