import { Component, Input, Output, EventEmitter } from '@angular/core';
//import { Component } from '@angular/core';
import { IPedido } from './../../providers/interfaces/ipedido';

@Component({
  selector: 'z-pageroomservicepedido',
  templateUrl: 'roomservice.pedido.html'
})
export class RoomServicePedido {

  
  @Input('pedido') 
  pedido: IPedido=<IPedido>{};
  
  @Output() procesar: EventEmitter<IPedido> = new EventEmitter<IPedido>();

  constructor() { 

  }

  initialize(){
      
  }

  ngOnInit() { 

      this.initialize();
  }

  enableSend():boolean
  {
    if (this.pedido.productos)
      return this.pedido.productos.length>0
    else
      return false;
  }
}
