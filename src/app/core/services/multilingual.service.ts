import { Injectable } from '@angular/core';
import { AppConfigService } from "../index";
import { AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { Subject }    from 'rxjs/Subject';
import { Storage } from '@ionic/storage';
import { ILang } from '../index';

// service
@Injectable()
export class MultilingualService {
   // private storage: Storage=new Storage();
    private _language_active = new Subject<string>();
    private storage_language:string="es";

    Language_active$ = this._language_active.asObservable();

    public SUPPORTED_LANGUAGES: Array<ILang> = [
        { code: 'en', title: 'English (United States)', image: '', active: false },
        { code: 'es', title: 'Español', image: '', active: false}
    ];

    public constructor(private storage:Storage, private translateService:TranslateService,private alertCtrl:AlertController){
        this.initialize();
    }

    public initialize()
    {
        this.storage.get("lang").then((value)=>{
            if(value && value!="")
            { 
                this.translateService.use(value);
                this._language_active.next(value)
                this.storage_language=value;
            }
            else
                this.setLanguage("es");
        },(error)=>{
            this.setLanguage("es");
        });
    }

    public getLanguageName(langCode:string):string
    {
        
        try {
                return this.SUPPORTED_LANGUAGES.filter(function(item, indx, arr){ return(item.code === langCode); })[0].title;
            } catch (error) {
                return  "Error...";
            }
    }

    public setLanguage(lang: string) {
        AppConfigService.setLanguage(lang);
        this._language_active.next(lang)
        this.translateService.use(lang);
        this.storage_language=lang;
    }

    public showAlertLanguage()
    {
        let inputs:any[]=[];

        this.SUPPORTED_LANGUAGES.forEach(valueLan=>{
            inputs.push({
                    name: 'options',
                    value : valueLan.code,
                    label:valueLan.title,
                    type:'radio',
                    checked: (valueLan.code===this.storage_language ? true : false)
            })
        });

        let alert = this.alertCtrl.create({
        title: 'Idioma',
        inputs: inputs,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Ok',
            handler: value => {
                this.setLanguage(value);
            }
          }
        ]
      });

      alert.present();

      /*
        return new Promise((resolve,reject)=>{
            alert.present().then((value)=>{
                if (value!=null)
                    resolve(value);
                else
                    resolve("es");
            },(error)=>{
                reject(error);
            });
        });  
        */

    /*
        let alert = this.alertCtrl.create({
        title: 'Add Friend',
        inputs: [
          {
            name: 'friendname',
            placeholder: 'Username or Email',
            value : ''
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Add',
            handler: formData => {
                if(formData.friendname == ""){
                    return false;
                }else{
                    this.presentToast("The user '"+formData.friendname+"' does not exists");
                }
            }
          }
        ]
      });
      alert.present();     
      */
    }    

    Translate(key:string):string
    {
      let traduce:string=key;
      try {
          this.translateService.get(key).subscribe(value=>{
                                  traduce=value;
                          },
                      err => { traduce=key }
                          )
      } catch (error) {
          console.log(error);
      }
      return traduce;
    }      
}
