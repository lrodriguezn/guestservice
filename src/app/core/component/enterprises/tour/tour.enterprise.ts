import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EnterpriseService, IEnterprise, EnterpriseMapPage } from './../../../index';

@Component({
    selector: "enterprisetourpage",
    templateUrl: "tour.enterprise.html"
})
export class EnterpriseTourPage {
    isLoading:boolean;
    enterprise:IEnterprise=null;
    
    constructor(private nav:NavController, private navParams:NavParams,private enterpriseService:EnterpriseService) {
        this.enterprise = navParams.get('enterprise');
        this.enterprise.gallery=[];
    }

    ngOnInit() {
        this.isLoading=true; 
        this.enterpriseService.loadGallery(this.enterprise).then(value=>{
            this.enterprise=value;
            this.isLoading=false;
        },(error=>{
            this.isLoading=false;
        }));
    }

    EditMap()
    {
        if (this.enterprise)
        {
            this.nav.push(EnterpriseMapPage, {
                enterprise: this.enterprise
            });
        }        
    }
}
