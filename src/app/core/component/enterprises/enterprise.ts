import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEnterprise } from './../../index';
import 'rxjs/add/operator/map'

@Component({
    selector: "z-enterprise",
    templateUrl: "enterprise.html"
})
export class EnterpriseComponent {
  // Recibe los datos vía propiedad desde su contenedor
  /** Arrya de empresas que debe pintar */
    visiblebuttonRemove:boolean=false;
    visiblebuttonAdd:boolean=false;
    viewcard:boolean=false;
    visiblebuttonTour:boolean=false;
    visiblebuttonEdit:boolean=false;

    @Input('buttons') 
    buttons:Array<any>=[];

    @Input('enterprise') 
    enterprise: IEnterprise;

    @Input('viewcard') 
    public set setviewcard(value){
        this.viewcard=(value=="true" ? true : false);
    }      
    
    // Emitir eventos
    /** propiedad para emitir cuando hacen click sobre un button del array */
    @Output() buttonclick: EventEmitter<any> = new EventEmitter<any>();


    constructor() {
    }

    Enterpriseclick(button)
    {
        this.buttonclick.emit({buttonname:button.name, enterprise:this.enterprise});
    }

}