import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppConfigService, MultilingualService } from './../app/core/index';
import { IProducto } from './interfaces/iproducto';
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
export class ProductosService {
    private baseUrl: string;
    
    private _productos$: Subject<IProducto[]> = new Subject<IProducto[]>();

    private dataStore: {
        productos: IProducto[]
    };

    public constructor( private http: Http,
                        private events:Events,
                        private multilingualService:MultilingualService
                        ){
        this.baseUrl = AppConfigService.apiUrl;
        this.dataStore = {productos: []};
    }

    get productos$(): Observable<IProducto[]> {
        return this._productos$.asObservable();
    }

    loadProductos()
    {
 
    }

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
}