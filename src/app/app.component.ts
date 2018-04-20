
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController, ToastController ,  Select, Events, LoadingController, Loading } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { MultilingualService, UserService, EnterpriseService, IEnterprise } from './core/index';
import { IMenuPage } from "../app/core/interfaces/Imenu";

import { HomePagePublic, TutorialPage, HomePageUser } from '../pages/index';
import  *  as menuService from '../providers/menu.service';

import { Observable } from "rxjs/Rx";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  loading:Loading;
  private enterpriseActive$:  Observable<IEnterprise>;
  enterprise: IEnterprise=<IEnterprise>{};

  username:string="";
  

  language:string="en";
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Select) selectLanguage: Select;

  //Menu para usuario NO conectados
  appMenu_loggedOutPage=menuService.appMenu_loggedOutPage;
  app_loggedOutPage=menuService.app_loggedOutPage;

  //Menu para usuario conectados
  appMenu_loggedInPage=menuService.appMenu_loggedInPage;
  app_loggedInPage=menuService.app_loggedInPage;

  rootPage: any;

  constructor(public platform: Platform, 
              private storage:Storage, 
              private events: Events,
              private menu: MenuController,
              private alertCtrl:AlertController, 
              private toastCtrl:ToastController, 
              private multilingualService:MultilingualService,
              private userService:UserService,
              private enterpriseService:EnterpriseService,
              private loadingCtrl: LoadingController
              ) {
      
        multilingualService.initialize();
        multilingualService.Language_active$.subscribe(value => {
           this.language = value;
        });

        this.enterpriseActive$=enterpriseService.enterpriseActive$;
        
        this.enterpriseService.loadActive();

        this.enterpriseActive$.subscribe(data=>{
            this.enterprise = data;
        });

      // verificar si existe un usuario logeado
      this.userService.hasLoggedIn().then((hasLoggedIn) => {
        this.enableMenu(hasLoggedIn === true);

        if (hasLoggedIn === true)
        {
          this.rootPage = HomePageUser;
          this.initializeApp();
        }
        else
        {
          // Check if the user has already seen the tutorial
          this.storage.get('hasSeenTutorial')
            .then((hasSeenTutorial) => {
              //hasSeenTutorial=false;
              if (hasSeenTutorial) {
                this.rootPage = HomePagePublic;
              } else {
                this.rootPage = TutorialPage;
              }
              this.initializeApp();
            })
        }
      });

      this.listenToLoginEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component,page.params);

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userService.logout();
      }, 1000);
    }

  }

  isActive(page: IMenuPage) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.component) {
        return 'primary';
      }
      return;
    }
    
    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'google';
    }
    return 'facebook';
  }
  
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
      console.log("app.user:login");
      this.getUserLocalStored();
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
      this.getUserLocalStored();
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
      this.getUserLocalStored();
    });

    this.events.subscribe('loading:true', () => {
        //console.log("loading:true");
          this.loading = this.loadingCtrl.create({
             dismissOnPageChange: false
          });
          this.loading.present();
    });

    this.events.subscribe('loading:false', () => {

        if (this.loading !== undefined) {
          this.loading.dismiss().catch(()=>{console.log("error loading.dismiss...")});
        }        
        //this.loading.dismiss();
          
    });    

/*    this.enterpriseService.httpRequestEventEmitter.subscribe(
      (data: string) => { 
          this.loading = this.loadingCtrl.create({
             dismissOnPageChange: true
          });
          //this.app.getComponent(ROOT_NAV).present(this.loading);
      }
    );
    this.enterpriseService.httpResponseEventEmitter.subscribe(
      (data: string) => { 
          this.loading.dismiss();
      }
    );
*/
/*    this.events.subscribe('enterprise:active', () => {
      this.getEnterpriseLocalStored();
    });*/
    
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  getUserLocalStored()
  {
      this.userService.getUsername().then((value)=>{
        console.log("LOGIN " + value);
        this.username=value;
      });      
  }  

  getEnterpriseLocalStored()
  {
      this.userService.getUsername().then((value)=>{
        console.log("LOGIN " + value);
        this.username=value;
      });      
  }  

  getLanguageName()
  {
    return this.multilingualService.getLanguageName(this.language);
  }

  changeLanguage()
  {
    this.multilingualService.showAlertLanguage();
  }
  
  presentToast(toastMessage) {
    let toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }

  getmenu(loggedIn: boolean,menu:string)
  {
      let arraymenu:any;

      if (loggedIn)
        arraymenu=this.app_loggedInPage.filter((value)=>{
            if (value.menu===menu)
              return value;
        });
      else{
        arraymenu=this.app_loggedOutPage.filter((value)=>{
            if (value.menu===menu)
              return value;
        });
      }
      return arraymenu;
  }

}
