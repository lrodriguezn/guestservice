import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import { Observable } from 'rxjs/Observable';
//import { Subject } from 'rxjs/Subject';
import { AppConfigService, IEnterprise } from "../index";
import 'rxjs/add/operator/map'


@Injectable()
export class UserService {
    //private user:IUser=null;
    //private baseUrl: string;
    private HAS_LOGGED_IN = 'hasLoggedIn';
    private HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
    
    private dataStore: {
        enterprises: IEnterprise[]
        enterpriseActive: IEnterprise,
    };

    public constructor(private appConfigService:AppConfigService, 
                        private http: Http,
                        private events:Events,
                        private storage:Storage
                        ){
        //this.baseUrl = AppConfigService.apiUrl;
        this.dataStore = { enterprises: [],enterpriseActive:null };
    }

    login(username: string) {
        //Proceso para hacer login
        //Buscar las empresas que tiene disponible el usuario
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.setUsername(username).then(value=>{
            console.log("Se hizo login");
            this.events.publish('user:login');
            this.getUsername();
        });
    };

    signup(username: string) {
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.setUsername(username).then(value=>{
            console.log("Se hizo signup");
            this.events.publish('user:signup');
        });
    };

    logout() {
        this.storage.remove(this.HAS_LOGGED_IN);
        this.storage.remove('enterprise_active');

        this.storage.remove('username').then(value=>{
            console.log("Se hizo logout");
            this.events.publish('user:logout');
        });

    };

    setUsername(username: string):Promise<string> {
        return this.storage.set('username', username);
    };    

    getUsername() {
        return this.storage.get('username').then((value) => {
            console.log("user name:" + value);
            return value;

        });
    };

    // return a promise
    hasLoggedIn() {
        return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
            return value === true;
        });
    };

    checkHasSeenTutorial() {
        return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
            return value;
        })
    };
}