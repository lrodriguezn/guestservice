import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IPedido } from './../../providers/interfaces/ipedido';
import { PedidoService } from './../../providers/pedido.service';

@Component({
  selector: 'page-roomservice',
  templateUrl: 'roomservice.html'
})
export class RoomServicePage {

    pedidoactual:IPedido=<IPedido>{};

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

}
