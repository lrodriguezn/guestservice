import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppConfigService, MultilingualService } from './../app/core/index';
import { IProducto } from './interfaces/iproducto';
import { IPedido } from './interfaces/ipedido';
import 'rxjs/add/operator/map'

export interface FirebaseResponse {
    [id: string]: {
            code:string,
            nombre: string;
            detalles: string;
            complementos: string;
            urlImage: string
            grupo:string;
            precio:number
    }
}

@Injectable()
export class PedidoService {
    private baseUrl: string;

    private _pedidoactual$: Subject<IPedido> = new Subject<IPedido>();

    private dataStore: {
        pedidoactual: IPedido
    };

    public constructor( private http: Http,
                        private events:Events,
                        private multilingualService:MultilingualService
                        ){
        this.baseUrl = AppConfigService.apiUrl;
        this.dataStore = {pedidoactual:<IPedido>{}};
        this.dataStore.pedidoactual.productos=[];
    }

    get pedidoactual$(): Observable<IPedido> {
        return this._pedidoactual$.asObservable();
    }

    addProducto(producto:IProducto)
    {
        this.dataStore.pedidoactual.productos.push(producto);
        //console.log("prod:" + JSON.stringify(producto));
        this._pedidoactual$.next(this.dataStore.pedidoactual);
    }

    loadPedidoActual()
    {
        this._pedidoactual$.next(this.dataStore.pedidoactual);
    }
/*
    loadProductosLocal(grupo:string)
    {
        this.events.publish('loading:true');
        this.http.get('assets/data/productos.json')
            .finally(() => {
                this.events.publish('loading:false');
            })  
            .map(res => {
                return <IProducto[]>res.json().result;
            })
            .subscribe(data => {
                this.dataStore.productos = data.filter(value=>{
                    if (value.grupo===grupo)
                    {
                        return value;
                    }
                });

                this._productos$.next(this.dataStore.productos);
                this.events.publish('loading:false');
        }, error => {
                this.events.publish('loading:false');
                console.log('Could not load productos loadLocal.')
        });
        
    }
*/

}