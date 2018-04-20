import { IMenu, 
            IMenuPage,
            EnterpriseListPage,
            EnterpriseListUserPage
         } from "../app/core/index";

import { HomePagePublic,
        HomePageUser,
        AboutPage,
        TutorialPage,
        SupportPage,
        LoginPage,
        SignupPage,

        ReservasPage,
        SugerenciasPage,
        EstadoCuentaContainer
     } from "../pages/index";

//Menu para usuarios NO conectado
export var appMenu_loggedOutPage:IMenu[] = [
    { title: 'Navigate', key_translate:'menu_Navigate', icon: '' },
    { title: 'Account', key_translate:'menu_Account', icon: '' },
    { title: 'Tutorial', key_translate:'menu_Tutorial', icon: '' }
];
export var app_loggedOutPage:IMenuPage[] = [
    { title: 'Home', menu:'Navigate', key_translate:'menu_Home', component:HomePagePublic, icon: 'home'},
    { title: 'Enterprise', menu:'Navigate', key_translate:'menu_enterprise', component:EnterpriseListPage, icon: 'laptop'},
    { title: 'Login', menu:'Account', key_translate:'menu_Login', component:LoginPage, icon: 'log-in'},
    { title: 'Signup', menu:'Account', key_translate:'menu_Signup', component:SignupPage, icon: 'person-add'},
    { title: 'Support', menu:'Account', key_translate:'menu_Support', component:SupportPage, icon: 'help'},
    { title: 'About', menu:'Tutorial', key_translate:'menu_About', component:AboutPage, icon: 'information-circle'},
    { title: 'Tutorial', menu:'Tutorial', key_translate:'menu_goTutorial', component:TutorialPage, icon: 'laptop'},
];


//Menu para usuario conectados
export var appMenu_loggedInPage:IMenu[] = [
    { title: 'Navigate', key_translate:'menu_Navigate', icon: '' },
    { title: 'Account', key_translate:'menu_Account', icon: '' },
    { title: 'Setting', key_translate:'menu_Setting', icon: '' },
    { title: 'About', key_translate:'menu_About', icon: '' },
    
];

export var app_loggedInPage:IMenuPage[] = [
    { title: 'Account', menu:'Account', key_translate:'menu_MyAccount', component:SignupPage, icon: 'person'},
    { title: 'Logout', menu:'Account', key_translate:'menu_Logout', component:HomePagePublic, icon: 'log-out', logsOut:true},
    { title: 'Support', menu:'Account', key_translate:'menu_Support', component:SupportPage, icon: 'help'},
    { title: 'Home', menu:'Navigate', key_translate:'menu_Home', component:HomePageUser, icon: 'home'},
    { title: 'Enterprise', menu:'Navigate', key_translate:'menu_Myenterprise', component:EnterpriseListUserPage, icon: 'search'},
    { title: 'roomservice', menu:'Navigate', key_translate:'mnu_roomservice', component:AboutPage, icon: 'notifications'},
    { title: 'Llamadas', menu:'Navigate', key_translate:'mnu_llamadas', component:AboutPage, icon: 'call'},
    { title: 'EstadoCuenta', menu:'Navigate', key_translate:'mnu_estadocuenta', component:EstadoCuentaContainer, icon: 'clipboard'},
    { title: 'Quejas', menu:'Navigate', key_translate:'mnu_quejas', component:AboutPage, icon: 'medical'},
    { title: 'Mensajes', menu:'Navigate', key_translate:'mnu_mensajes', component:EstadoCuentaContainer, icon: 'chatboxes'},
    { title: 'Atencion', menu:'About', key_translate:'mnu_atencioncliente', component:AboutPage, icon: 'checkmark'},

    //{ title: 'Consumos', menu:'Navigate', key_translate:'consumos_title', component:RoomServiceContainer, icon: 'text'},
    //{ title: 'Reservas', menu:'Navigate', key_translate:'mnu_reservas', component:ReservasPage, icon: 'star'},
    { title: 'ZeusReservas', menu:'Navigate', key_translate:'mnu_reservaszeus', component:ReservasPage, icon: 'star'},
    { title: 'Setting', menu:'Setting', key_translate:'menu_Setting', component:HomePagePublic, icon: 'settings'},
    { title: 'Sugerencias', menu:'About', key_translate:'mnu_sugerencias', component:SugerenciasPage, icon: 'mail'},
    { title: 'About', menu:'About', key_translate:'menu_About', component:AboutPage, icon: 'information-circle'}
];