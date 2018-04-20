import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { IProducto } from './../../providers/interfaces/iproducto';
import { MultilingualService } from "../../app/core/index";

@Component({
  selector: 'z-producto',
  templateUrl: 'roomservice.producto.html'
})
export class RoomServiceProducto {
  cantidad:number=1;
  comentarios:string="";
  togglecomentarios:boolean=false;

  @Input('producto') 
  producto: IProducto=null;
  
  @Output() add: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  
  constructor(private toastCtrl: ToastController,
              private multilingualService:MultilingualService
            ) { }

  AddProducto(productosForm){

    if (productosForm.valid) {
      this.producto.cantidad=this.cantidad;
      this.producto.comentariospedido=this.comentarios;

        let toast = this.toastCtrl.create({
          message: this.multilingualService.Translate("roomservice_message_add"),
          duration: 2000
        });
        toast.present();
      
      this.add.emit(this.producto);
    }
     
  }
}
