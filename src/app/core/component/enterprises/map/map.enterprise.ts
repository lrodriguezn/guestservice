import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { IEnterprise } from './../../../index';

declare var google: any;

@Component({
  selector: 'enterprisemappage',
  templateUrl: 'map.enterprise.html'
})
export class EnterpriseMapPage {
  enterprise:IEnterprise=null;

  @ViewChild('mapCanvas') mapElement: ElementRef;

  constructor(private platform: Platform, private nav:NavController, private navParams:NavParams) {
      this.enterprise = navParams.get('enterprise');
  }

  ionViewDidLoad() {
      //console.log("editar lat:" + this.enterprise.map.lat);

      if (this.enterprise.map){

        let mapEle = this.mapElement.nativeElement;

        let map = new google.maps.Map(mapEle, {
          center:new google.maps.LatLng(this.enterprise.map.lat, this.enterprise.map.lng),
          zoom: 14
        });

        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${this.enterprise.name}</h5>`
        });

          let marker = new google.maps.Marker({
            position: this.enterprise.map,
            map: map,
            title: this.enterprise.name
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          google.maps.event.addListenerOnce(map, 'idle', () => {
            mapEle.classList.add('show-map');
          });
      }
  }
  
}
