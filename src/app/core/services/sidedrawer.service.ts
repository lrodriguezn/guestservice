import { Injectable } from '@angular/core';
import { ISideDrawerItem } from './../interfaces/Isidedrawer';


@Injectable()
export class SideDrawerService {

    SideDrawerItems: ISideDrawerItem[] = [
        {
            "title": "mnu_inicio",
            "key_translate":"mnu_inicio",
            "font_icon":"fa-home",
            "componenetName": "",
            "path": "Home",
            "active": true,
            "lineseparator":false,
            "subItems": [],
        },
        {
            "title": "mnu_actualizacion",
            "key_translate":"mnu_actualizacion",
            "font_icon":"fa-male",
            "componenetName": "",
            "path": "/todo",
            "active": false,
            "lineseparator":false,
            "subItems": [],
        },
        {
            "title": "mnu_micuenta",
            "key_translate":"mnu_micuenta",
            "font_icon":"fa-user",
            "componenetName": "",
            "path": "",
            "active": false,
            "lineseparator":false,
            "subItems": []
        },
        {
            "title": "mnu_estadocuenta",
            "key_translate":"mnu_estadocuenta",
            "font_icon":"fa-money",
            "componenetName": "",
            "path": "",
            "active": false,
            "lineseparator":false,
            "subItems": []
        },
        {
            "title": "mnu_llamadas",
            "key_translate":"mnu_llamadas",
            "font_icon":"fa-hand-pointer-o",
            "componenetName": "",
            "path": "",
            "active": false,
            "lineseparator":false,
            "subItems": []
        },
        {
            "title": "mnu_invitados",
            "key_translate":"mnu_invitados",
            "font_icon":"",
            "componenetName": "fa-group",
            "path": "",
            "active": false,
            "lineseparator":false,
            "subItems": []
        },
        {
            "title": "mnu_canjes",
            "key_translate":"mnu_canjes",
            "font_icon":"fa-slideshare",
            "componenetName": "",
            "path": "",
            "active": false,
            "lineseparator":false,
            "subItems": []
        },
        {
            "title": "mnu_pedidos",
            "key_translate":"mnu_pedidos",
            "font_icon":"fa-shopping-cart",
            "componenetName": "",
            "path": "",
            "active": false,
            "lineseparator":false,
            "subItems": []
        },
        {
            "title": "mnu_vehiculos",
            "key_translate":"mnu_vehiculos",
            "font_icon":"fa-car",
            "componenetName": "",
            "path": "",
            "active": false,
            "lineseparator":false,
            "subItems": []
        },
        {
            "title": "mnu_personal",
            "key_translate":"mnu_personal",
            "font_icon":"fa-child",
            "componenetName": "",
            "path": "",
            "active": false,
            "lineseparator":false,
            "subItems": []
        },
        {
            "title": "mnu_eventos",
            "key_translate":"mnu_eventos",
            "font_icon":"fa-newspaper-o",
            "componenetName": "",
            "path": "",
            "active": false,
            "lineseparator":false,
            "subItems": []
        },
        {
            "title": "mnu_servicios",
            "key_translate":"mnu_servicios",
            "font_icon":"fa-calendar-check-o",
            "componenetName": "",
            "path": "",
            "active": false,
            "lineseparator":true,
            "subItems": []
        },
        {
            "title": "mnu_ajustes",
            "key_translate":"mnu_ajustes",
            "font_icon":"fa-cogs",
            "componenetName": "",
            "path": "/settings",
            "active": false,
            "lineseparator":false,
            "subItems": []
        },
        {
            "title": "mnu_historiaclub",
            "key_translate":"mnu_historiaclub",
            "font_icon":"fa-university",
            "componenetName": "",
            "path": "",
            "active": false,
            "lineseparator":false,
            "subItems": []
        },
        {
            "title": "mnu_sugerencias",
            "key_translate":"mnu_sugerencias",
            "font_icon":"fa-envelope-o",
            "componenetName": "",
            "path": "",
            "active": false,
            "lineseparator":false,
            "subItems": []
        },
        {
            "title": "mnu_atencioncliente",
            "key_translate":"mnu_atencioncliente",
            "font_icon":"fa-question-circle",
            "componenetName": "",
            "path": "",
            "active": false,
            "lineseparator":false,
            "subItems": []
        },
        
    ]

    getAllItems(): Array<ISideDrawerItem>  {
        return this.SideDrawerItems;
    }

    
/*    addItem()
    {
        this.SideDrawerItems.push(new SideDrawerItem("item" +this.SideDrawerItems.length.toString(),
                                                    "item" +this.SideDrawerItems.length.toString(),
                                                    "item" +this.SideDrawerItems.length.toString(),
                                                    "" +this.SideDrawerItems.length.toString(),
                                                    "",
                                                    true,
                                                    null)
                                )
    }
*/

    removeActive()
    {
        this.SideDrawerItems.forEach(function(value){
               value.active=false; 
        });
    }
}
