import { Component } from '@angular/core';
import { RoomServiceDetailPage } from './roomservice.detail';
import { NavController } from 'ionic-angular';
import { IPedido } from './../../providers/interfaces/ipedido';
import { PedidoService } from './../../providers/pedido.service';

@Component({
  selector: 'page-roomservicecontainer',
  templateUrl: 'roomservice.container.html'
})
export class RoomServiceContainer {
    fechainicial:any="03/01/2017";
    fechafinal:any="03/01/2017";
    pedidoactual:IPedido=<IPedido>{};

    segmentvalue:any="menu";

    buttons=[{name:"buttonadd", key_translate:"canjes_add", icon:"star", color:"", isSmall:true, isClear:true, isRound:false, isOutline:false, isfull:false},
            ];
        
  constructor(private navCtrl: NavController,
                private pedidoService:PedidoService
                ) { 
  }

    initialize(){
        this.pedidoService.pedidoactual$.subscribe(data=>{
            this.pedidoactual = data;
        });        

        this.pedidoService.loadPedidoActual();        
    }

    ngOnInit() {

        this.initialize();
    }

    onDetail(grupo_code,grupo_name)
    {
        let jsongrupo:any={code:grupo_code,name:grupo_name};
        this.navCtrl.push(RoomServiceDetailPage, {grupo: jsongrupo});
    }
}
