
import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { NavController, NavParams } from 'ionic-angular';
//import { Observable } from "rxjs/Rx";
import { EnterpriseService, IEnterprise, EnterpriseDetailPage, EnterpriseTourPage,MultilingualService } from './../../../index';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'enterpriselistuserpage',
  templateUrl: 'listuser.enterprise.html'
})
export class EnterpriseListUserPage {
    user:any="";
    searchbartext:string="";
    segmentvalue:any="userenterprises";
    
    buttonsviewcard=[{name:"buttonadd", key_translate:"enterprise_add", icon:"star", color:"", isSmall:true, isClear:false, isRound:false, isOutline:false, isfull:false},
             {name:"buttontour", key_translate:"enterprise_viewTour", icon:"star", color:"secondary", isSmall:true, isClear:false, isRound:false, isOutline:false, isfull:false},
            ];

    buttonslocal=[{name:"buttonremove", key_translate:"enterprise_remove", icon:"trash", color:"danger", isSmall:true, isClear:true, isRound:false, isOutline:false, isfull:false} ];

    enterprises: Array<IEnterprise>= [];
    enterprises_Localstore:  Array<IEnterprise>= [];
    editing_enterprise:boolean=false;
    enterprise_edit:IEnterprise= <IEnterprise>{};


    constructor(public nav: NavController, 
                private navParams:NavParams,
                private Translate:TranslateService,
                private enterpriseService:EnterpriseService,
                private toastCtrl: ToastController,
                private multilingualService:MultilingualService
                ) {
    }

    initialize(){
        
        this.enterpriseService.init_local();
        this.enterpriseService.loadAll();

        this.enterpriseService.enterprises$.subscribe(data=>{
            this.enterprises = data;
        });

        this.enterpriseService.enterprisesLocalstore$.subscribe(data=>{
            this.enterprises_Localstore = data;
        });
    }

    ngOnInit() {

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

    AddEnterprise(enterprise:IEnterprise)
    {
         this.enterpriseService.AddLocalStore(enterprise);

        let toast = this.toastCtrl.create({
                message: this.multilingualService.Translate("enterprise_eventadd") + " (" +enterprise.name + ")",
                duration: 1500
            });
        toast.present();

    }

    RemoveEnterprise(enterprise:IEnterprise)
    {
        if (enterprise)
        {
            this.enterpriseService.RemoveLocalStore(enterprise);
            let toast = this.toastCtrl.create({
                    message: this.multilingualService.Translate("enterprise_eventremove") + " (" +enterprise.name + ")",
                    duration: 1500
                });
            toast.present();            
        }
    } 

    Refresh(){
        this.initialize();
    }

    Enterpriseclick(value)
    {
        switch (value.buttonname) {
            case "buttonadd":
                this.AddEnterprise(value.enterprise);
                break;

            case "buttonremove":
                this.RemoveEnterprise(value.enterprise);
                break;

            case "buttontour":
                this.TourEnterprise(value.enterprise);
                break;

            case "buttonedit":
                this.EditEnterprise(value.enterprise);
                break;
        
            default:
                break;
        }
    }
}