import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppConfigService, IEnterprise, IGallery, IApp, IMap } from "../index";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/finally'
//import 'rxjs/Rx';

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
            urlImage:string,
            app:IApp[],
            map:IMap[]
    }
}

export interface FirebaseResponseGallery {
    [id: string]: {
            name: string,
            description:string,
            image:string
    }
}

export interface FirebaseResponseMap {
    [id: string]: {
        lat:string,
        lng:string
    }
}

@Injectable()
export class EnterpriseService {

    private baseUrl: string;
    
   // private _isLoading$:Subject<boolean>= new Subject<boolean>();;
    private _enterprises$: Subject<IEnterprise[]> = new Subject<IEnterprise[]>();
    private _enterprisesLocalstore$: Subject<IEnterprise[]> = new Subject<IEnterprise[]>();
    private _enterpriseActive$: Subject<IEnterprise>= new Subject<IEnterprise>();

    private dataStore: {
        enterprises: IEnterprise[],
        enterprisesFilter: IEnterprise[],
        enterprisesLocalstore: IEnterprise[],
        enterpriseActive: IEnterprise,
    };

    public constructor(private appConfigService:AppConfigService, private http: Http,private events:Events){
        this.baseUrl = AppConfigService.apiUrl;
        this.dataStore = { enterprises: [], enterprisesFilter:[], enterprisesLocalstore:[],enterpriseActive:null };
    }

    get enterprises$(): Observable<IEnterprise[]> {
        return this._enterprises$.asObservable();
    }

    get enterpriseActive$(): Observable<IEnterprise> {
        return this._enterpriseActive$.asObservable();
    }

    get enterprisesLocalstore$(): Observable<IEnterprise[]> {
        return this._enterprisesLocalstore$.asObservable();
    }

/*    get isLoading$(): Observable<boolean> {
        return this._isLoading$.asObservable();
    }*/

    init_local()
    {
        this.loadLocalstore();
        this.loadActive();
    }

    loadActive()
    {
        this.http.get('assets/data/data.json')
            .map(res => {
            return <IEnterprise>res.json();
            })
            .subscribe(data => {
            
                AppConfigService.getEnterprise_active().then((value)=>{
                    data=<IEnterprise>JSON.parse(value);
                    this.dataStore.enterpriseActive = data;
                    this._enterpriseActive$.next(this.dataStore.enterpriseActive);
                });

        }, error => console.log('Could not load enterprises loadActive.'));
            
    }

    loadLocalstore()
    {
        
        this.http.get('assets/data/data.json')
            .map(res => {
            return <IEnterprise[]>res.json();
            })
            .subscribe(data => {

                AppConfigService.getEnterprises().then((value)=>{
                    data=<IEnterprise[]>JSON.parse(value);
                    this.dataStore.enterprisesLocalstore = data;
                    this._enterprisesLocalstore$.next(this.dataStore.enterprisesLocalstore);
                });
                
        }, error => console.log('Could not load enterprises loadLocalstore.'));
     
    }
        
    loadLocal()
    {
        this.http.get('assets/data/enterprise.json')
            .map(res => {
            return <IEnterprise[]>res.json().Result;
            })
            .subscribe(data => {
                this.dataStore.enterprises = data;
                this._enterprises$.next(this.dataStore.enterprises);
        }, error => console.log('Could not load enterprises loadLocal.'));
    }

    loadAll()
    {
        try {
            //this._isLoading$.next(true);
            this.events.publish('loading:true');
            this.http.get(this.baseUrl + 'enterprises/data.json?orderBy="app/hoteles"&startAt=""')
                //.do((response) => { this.httpRequestEventEmitter.emit(event + '-request-started'); })
                //.do((response) => { this.events.publish('loading:true'); })
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
                        
                    enterprises.sort((a,b)=>{
                        if (a.name>b.name)
                        {
                            return 1;
                        }

                        if (a.name < b.name) {
                            return -1;
                        }

                        return 0;
                    });
                        
                    return enterprises;
                 })
                .subscribe(result => {
                    this.dataStore.enterprises = <IEnterprise[]>result;
                    //Si el club no tiene gallery se asigna la 1ra imagen
                    this.dataStore.enterprises.forEach(enterprise=>{
                        enterprise.active=false;
                        enterprise.user_token="";
                        enterprise.user_membership_id="";
                        enterprise.user_pass="";
                        enterprise.user_type="";
                        if (enterprise.gallery)
                        {
                            if (enterprise.gallery.length==0)
                            {
                                enterprise.gallery.push({name:"",description:"",image:enterprise.urlImage});
                            }
                        }
                        else
                        {
                            enterprise.gallery=[];
                            enterprise.gallery.push({name:"",description:"",image:enterprise.urlImage});
                        }
                    });

                    /*
                    this.dataStore.enterprises.sort((a,b)=>{
                        if (a.name>b.name)
                        {
                            return 1;
                        }

                        if (a.name < b.name) {
                            return -1;
                        }

                        return 0;
                    });
                    */

                    //console.log("ok4");
                    this.updateEnterprisesWithEnterprisesUser();
                   //console.log("ok5");
                    this._enterprises$.next(this.dataStore.enterprises);
                    //console.log("ok6");
                    //this._isLoading$.next(false);
                }, error => {
                    this.events.publish('loading:false');
                    console.log('Could not load loadAll.'); 
                    console.log('Error' + error);
                    //this._isLoading$.next(false);
                
            })
        } catch (error) {
            this.events.publish('loading:false');
            console.log(error);
        }
    }

    loadGallery(enterprise:IEnterprise):Promise<IEnterprise>
    {
        return new Promise((resolve,reject)=>{
                if (enterprise==null)
                {
                    resolve(enterprise)
                    return;
                }
                this.events.publish('loading:true');
                this.http.get(this.baseUrl + 'enterprises/gallery/' + enterprise.code + '.json')
                    .map(response => {
                        let gallery=[];
                        
                        let firebaseResponsegallery=JSON.parse(JSON.stringify(response.json()));
                        Object.keys(firebaseResponsegallery).forEach(valueId=>{
                            gallery.push(firebaseResponsegallery[valueId])
                        });
                        return gallery;
                    })
                    .subscribe(result => {
                        enterprise.gallery = <IGallery[]>result;
                        
                        if (enterprise.gallery)
                        {
                            enterprise.gallery.push({name:"",description:"",image:enterprise.urlImage});
                        }
                        else
                        {
                            enterprise.gallery=[];
                            enterprise.gallery.push({name:"",description:"",image:enterprise.urlImage});
                        }
                        this.events.publish('loading:false');
                        resolve(enterprise)
                    }, error => {
                        this.events.publish('loading:false');
                        enterprise.gallery=[];
                        enterprise.gallery.push({name:"",description:"",image:enterprise.urlImage});
                        resolve(enterprise);
                        console.log('Could not load loadGallery.');
                });            
        }); 
    }

  //Agregar una enterprise al local store
    AddLocalStore(enterprise:IEnterprise)
    {
        this.loadLocalstore();
        
        if (enterprise!=null)
        {
            enterprise.active=true;

            if (this.dataStore.enterprisesLocalstore==null)
                this.dataStore.enterprisesLocalstore=[]; 

            //Si la empresa ya esta registrado 
            if (this.dataStore.enterprisesLocalstore.filter(x=>x.code==enterprise.code)[0])
                this.dataStore.enterprisesLocalstore.filter(x=>x.code==enterprise.code)[0]=enterprise;
            else
                this.dataStore.enterprisesLocalstore.push(enterprise);
            
            AppConfigService.setEnterprises(JSON.stringify(this.dataStore.enterprisesLocalstore));

            //Guardar como Enterprise default
            AppConfigService.setEnterprise_active=JSON.stringify(enterprise);
            //this.events.publish('enterprise:active');

            this._enterpriseActive$.next(enterprise);
        }
    }

    RemoveLocalStore(enterprise:IEnterprise)
    {
        if (enterprise!=null)
        {
            if (this.dataStore.enterprisesLocalstore!=null)
            {
                let pos = this.dataStore.enterprisesLocalstore.indexOf(enterprise);
                if (pos>=0)
                {
                    this.dataStore.enterprisesLocalstore.splice(pos,1);
                    this._enterprisesLocalstore$.next(this.dataStore.enterprisesLocalstore);
                    AppConfigService.setEnterprises(JSON.stringify(this.dataStore.enterprisesLocalstore));

                    if (this.dataStore.enterprisesLocalstore.length<=0)
                    {
                        AppConfigService.setEnterprises("[]");
                        this.dataStore.enterpriseActive=<IEnterprise>{};
                        this._enterpriseActive$.next(this.dataStore.enterpriseActive);
                        AppConfigService.setEnterprise_active=JSON.stringify(this.dataStore.enterpriseActive);
                        this.loadActive();
                        
                    }
                    else
                    {
                        //Actualizar la ultima empresa seleccionada por el usuario, para usarlo en la proxima vez que inicie la app
                        this.loadActive();
                        //Si la empresa que estan borrando es el ultimo seleccionado para ingresar a la plataforma, se debe cambiar por otro seleccionado
                        if (this.dataStore.enterpriseActive.code==enterprise.code)
                        {
                            this._enterpriseActive$.next(this.dataStore.enterprisesLocalstore[0]);
                            AppConfigService.setEnterprise_active=JSON.stringify(this.dataStore.enterprisesLocalstore[0]);
                            this.loadActive();
                        }
                    }
                    this.updateEnterprisesWithEnterprisesUser();
                }
            }
        }
    }

    updateEnterprisesWithEnterprisesUser()
    {
        //Leer los clubes que fueron seleccionado por el usuario y marcarlos como activo en el Array de clubes general
        let EnterprisesUsers=this.dataStore.enterprisesLocalstore;
        
        if (EnterprisesUsers!=null)
        {
            if (EnterprisesUsers.length>0)
            {
                this.dataStore.enterprises.forEach(function(item){
                    item.active=false;
                    if (EnterprisesUsers.map(x=>x.code).indexOf(item.code)!=-1)
                    {
                        item.active=true;
                    }
                });
                this._enterprises$.next(this.dataStore.enterprises);
            }
        }
    }

    SearchEnterprises(Filter:string, filterEnterprisesUser:boolean)
    {
        if (!filterEnterprisesUser)
        {
            if(Filter!="")
            {
                this.dataStore.enterprisesFilter=this.dataStore.enterprises.filter(enterprise=>{
                    return (enterprise.name.toLowerCase().indexOf(Filter.toLowerCase())!=-1 ? true:false);
                });

                if (!this.dataStore.enterprisesFilter)
                    this.dataStore.enterprisesFilter=[];
                
                this._enterprises$.next(this.dataStore.enterprisesFilter);
            }
            else
                this._enterprises$.next(this.dataStore.enterprises);
        }
        else
        {
            if(Filter!="")
            {
                this.dataStore.enterprisesFilter=this.dataStore.enterprisesLocalstore.filter(enterprise=>{
                    return (enterprise.name.toLowerCase().indexOf(Filter.toLowerCase())!=-1 ? true:false);
                });

                if (!this.dataStore.enterprisesFilter)
                    this.dataStore.enterprisesFilter=[];
                    
                this._enterprisesLocalstore$.next(this.dataStore.enterprisesFilter);
            }
            else
                this._enterprisesLocalstore$.next(this.dataStore.enterprisesLocalstore);
        }
    }

    getCountryCity(item:IEnterprise):string
    {
        if (item!=null)
        {
            return item.city  + ',' + item.country
        }
    }

    getTypeAccess(item:IEnterprise):string
    {
        if (item)
            if (item.user_type != undefined)
            {
                return (item.user_type.toUpperCase() == "SOCIO" ? AppConfigService.Translate("enterprise_socio") : AppConfigService.Translate("clubles_publico"))
            }
            else
                return AppConfigService.Translate("clubles_publico");
    }    

}