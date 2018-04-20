import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AppConfigService {
    private static storage: Storage=new Storage();

    public constructor(){
    }

    static apiUrl="https://nativescript-8222f.firebaseio.com/"

    //Manejo de idioma
    static getLanguage():Promise<string> {
        return new Promise((resolve,reject)=>{
            this.storage.get("lang").then((value)=>{
                if (value!=null)
                    resolve(value);
                else
                    resolve("es");
            },(error)=>{
                reject(error);
            });
        });         
    }

    static setLanguage(value:string){
        this.storage.set("lang",value);
    }

    static removeLanguage(value:string){
        this.storage.remove("lang");
    }

    static getAppVersion():string
    {
        return "1.0.0";
    }   

    //Manejo de empresas seleccionados y ultima empresa seleccionada
    static getEnterprises():Promise<string> {
        return new Promise((resolve,reject)=>{
            this.storage.get("enterprises").then((value)=>{
                if (value!=null)
                    resolve(value);
                else
                    resolve("[]");
            },(error)=>{
                reject(error);
            });
        });  
    }

    static setEnterprises(value:string){
        this.storage.set("enterprises",value);
    }

    static getEnterprise_active():Promise<string> {
        return new Promise((resolve,reject)=>{
            this.storage.get("enterprise_active").then((value)=>{
                if (value!=null)
                    resolve(value);
                else
                    resolve("[]");
            },(error)=>{
                reject(error);
            });
        });  
    }

    static set setEnterprise_active(value:string){
        this.storage.set("enterprise_active",value);
    }

    static Translate(key:string):string
    {
        let traduce:string=key;
        try {
            traduce="";
        } catch (error) {
            console.log("Error traduciendo:" + traduce + " Error:" + error);
        }
        return traduce;
    }    
}