import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppConfigService, IEnterprise, MultilingualService } from './../app/core/index';
import { ICanje } from './interfaces/icanje';
import 'rxjs/add/operator/map'

export interface FirebaseResponse {
    [id: string]: {
            code: string,
            name: string,
            description:string,
            country:string,
            city:string, 
            address:string,
            tel:string,
            fax:string,
            email:string,
            urlApi:string,
            urlImage:string
    }
}

@Injectable()
export class CanjesService {
    private baseUrl: string;
    
    private _enterprises$: Subject<IEnterprise[]> = new Subject<IEnterprise[]>();
    private _canjes$: Subject<ICanje[]> = new Subject<ICanje[]>();

    private dataStore: {
        enterprises: IEnterprise[],
        canjes: ICanje[]
    };

    public constructor( private http: Http,
                        private events:Events,
                        private multilingualService:MultilingualService
                        ){
        this.baseUrl = AppConfigService.apiUrl;
        this.dataStore = { enterprises: [], canjes: []};
    }

    get enterprises$(): Observable<IEnterprise[]> {
        return this._enterprises$.asObservable();
    }

    get canjes$(): Observable<ICanje[]> {
        return this._canjes$.asObservable();
    }

    loadClubes()
    {
        try {
            this.events.publish('loading:true');
            //console.log("URL:" + this.baseUrl + 'enterprises/data.json');
            this.http.get(this.baseUrl + 'enterprises/data.json')
                .finally(() => {
                    //this.httpResponseEventEmitter.emit(event + '-request-finished');
                    this.events.publish('loading:false');
                })
                .map(response => {
                    let enterprises=[];

                    let firebaseResponse=JSON.parse(JSON.stringify(response.json()));

                    Object.keys(firebaseResponse).forEach(valueId=>{
                        enterprises.push(firebaseResponse[valueId])
                    });
                        
                    return enterprises;
                 })
                .subscribe(result => {
                    this.dataStore.enterprises = <IEnterprise[]>result.slice(1, 4); //Solo tomar los 1ero 3 clubes
                    this._enterprises$.next(this.dataStore.enterprises);
                }, error => {
                    this.events.publish('loading:false');
                    console.log('Could not load loadClubes.'); 
                    console.log('Error' + error);
            });            
        } catch (error) {
            this.events.publish('loading:false');
            console.log(error);
        }
    }

    loadCanjesLocal()
    {
        this.events.publish('loading:true');
        this.http.get('assets/data/canjes.json')
            .finally(() => {
                this.events.publish('loading:false');
            })  
            .map(res => {
                return <ICanje[]>res.json().result;
            })
            .subscribe(data => {
                this.dataStore.canjes = data;
                this._canjes$.next(this.dataStore.canjes);
                this.events.publish('loading:false');
        }, error => {
                this.events.publish('loading:false');
                console.log('Could not load canjes loadLocal.')
        });
    }

    getEstadoCanje(estado:string):string
    {
        switch (estado.toUpperCase()) {
            case "POR AUTORIZAR":
                    return this.multilingualService.Translate("canjes_estado1");

            case "AUTORIZADO":
                    return this.multilingualService.Translate("canjes_estado2");

            case "RECHAZADO":
                    return this.multilingualService.Translate("canjes_estado3");
        
            default:
                return estado;
        }
    }
   
    getColorEstadoCanje(estado:string):string
    {
        switch (estado.toUpperCase()) {
            case "POR AUTORIZAR":
                    return "orange";

            case "AUTORIZADO":
                    return "facebook";

            case "RECHAZADO":
                    return "danger2";
        
            default:
                return "danger2";
        }
    }   
}