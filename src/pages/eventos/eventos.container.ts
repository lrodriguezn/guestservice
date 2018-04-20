//http://meshfields.de/embed-youtube-videos-ionic2-angular2/
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';  
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { MultilingualService } from "../../app/core/index";

@Component({
  selector: 'page-eventoscontainer',
  templateUrl: 'eventos.container.html'
})
export class EventosContainer {
    url: SafeResourceUrl;
    submitted = false;
    fechainicial:any="03/01/2017";
    fechafinal:any="03/01/2017";
    detalles:string="";

    segmentvalue:any="mes";

    buttons=[{name:"buttonadd", key_translate:"canjes_add", icon:"star", color:"", isSmall:true, isClear:true, isRound:false, isOutline:false, isfull:false},
            ];
        
  constructor(private nav:NavController, 
              private navParams:NavParams,
              private toastCtrl: ToastController,
              private multilingualService:MultilingualService,
              private domSanitizer:DomSanitizer
              ) { 
                //https://youtu.be/vUr-Optp2ds
        this.url=domSanitizer.bypassSecurityTrustResourceUrl('https://youtube.com/embed/lxF_VJZaSxo');
  }

    initialize(){
        
    }

    ngOnInit() {

        this.initialize();
    }


  onEnviar(form: NgForm) {
    this.submitted=true;
    if (this.submitted && form.valid) {
      this.submitted = false;

      let toast = this.toastCtrl.create({
        message: "Solitud enviada para su procesamiento", //this.multilingualService.Translate("canjes_send_message"),
        duration: 4000
      });
      toast.present();
    }
  }

  onCancel() {
    this.submitted=false;
    if (this.nav.canGoBack())
      this.nav.pop();
  } 

}
