import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { IProducto } from './../../providers/interfaces/iproducto';
import { ProductosService } from './../../providers/productos.service';
import { IPedido } from './../../providers/interfaces/ipedido';
import { PedidoService } from './../../providers/pedido.service';
import { RoomServicePage } from './roomservice';

@Component({
  selector: 'page-roomservicedetail',
  templateUrl: 'roomservice.detail.html'
})
export class RoomServiceDetailPage {
  productos: Array<IProducto>= [];
  pedidoactual:IPedido=<IPedido>{};
  grupo:any;

  constructor(private navCtrl: NavController,
                private modalController:ModalController,
                private navParams:NavParams, 
                private toastCtrl: ToastController,
                private productosService:ProductosService,
                private pedidoService:PedidoService
              ){ 
            this.grupo = navParams.get('grupo');
    }

    initialize(){
        this.pedidoactual.productos= [];

        this.productosService.loadProductosLocal(this.grupo.code);

        this.productosService.productos$.subscribe(data=>{
            this.productos = data;
        });
        
        this.pedidoService.pedidoactual$.subscribe(data=>{
            this.pedidoactual = data;
        });
    }

    ngOnInit() {

        this.initialize();
    }

    onAddProducto(producto:IProducto)
    {
        this.pedidoService.addProducto(producto);
    }

    presentPedidoModal()
    {
        this.navCtrl.push(RoomServicePage);
        //let PedidoModal = this.modalController.create(RoomServicePedidoShow);
        //PedidoModal.present();
    }
}
