
import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { NavController, NavParams } from 'ionic-angular';
//import { Observable } from "rxjs/Rx";
import { EnterpriseService, IEnterprise, EnterpriseDetailPage, EnterpriseTourPage } from './../../../index';

@Component({
  selector: 'enterpriselistpage',
  templateUrl: 'list.enterprise.html'
})
export class EnterpriseListPage {
    //loader:Loading;
    user:any="";
    searchbartext:string="";
    segmentvalue:any="enterprises";
    
    buttons=[{name:"buttontour", key_translate:"enterprise_viewTour", icon:"star", color:"secondary", isSmall:true, isClear:false, isRound:false, isOutline:false, isfull:false},
            ];

    //private enterprises$:  Observable<IEnterprise[]>;
    //private enterprises_Localstore$:  Observable<IEnterprise[]>;
    //private isLoading$:  Observable<boolean>;

    enterprises: Array<IEnterprise>= [];
    enterprises_Localstore:  Array<IEnterprise>= [];
    editing_enterprise:boolean=false;
    enterprise_edit:IEnterprise= <IEnterprise>{};
    isLoading:boolean;

    constructor(public nav: NavController, 
                private navParams:NavParams,
                private Translate:TranslateService,
                private enterpriseService:EnterpriseService
                ) {
    }

    initialize(){
        //this.enterprises$ = this.enterpriseService.enterprises$; // subscribe to entire collection
        //this.enterprises_Localstore$ = this.enterpriseService.enterprisesLocalstore$; 
        
        //this.isLoading$ = this.enterpriseService.isLoading$; // subscribe a isLoading del servicio

/*        this.isLoading$.subscribe(data=>{
            this.isLoading = data;
            
            this.isloadingdata(data);
        });*/
        this.enterpriseService.enterprises$.subscribe(data=>{
            this.enterprises = data;
        });

        this.enterpriseService.enterprisesLocalstore$.subscribe(data=>{
            this.enterprises_Localstore = data;
        });

        this.enterpriseService.init_local();
        this.enterpriseService.loadAll();

/*        this.enterprises$.subscribe(data=>{
            this.enterprises = data;
        });
*/
/*        this.enterprises_Localstore$.subscribe(data=>{
            this.enterprises_Localstore = data;
        });*/

    }

    ionViewWillEnter() {
        this.initialize();        
    }

    searchBar()
    {
        this.enterpriseService.SearchEnterprises(this.searchbartext,(this.segmentvalue==="userenterprises" ? true : false));
    }    

    EditEnterprise(enterprise:IEnterprise)
    {
        if (enterprise)
        {
            this.nav.push(EnterpriseDetailPage, {
                enterprise: enterprise
            });
        }
    } 

    TourEnterprise(enterprise:IEnterprise)
    {
        if (enterprise)
        {
            this.nav.push(EnterpriseTourPage, {
                enterprise: enterprise
            });
        }
    } 

    Refresh(){
        this.initialize();
    }

    Enterpriseclick(value)
    {
        this.TourEnterprise(value.enterprise);
    }
}