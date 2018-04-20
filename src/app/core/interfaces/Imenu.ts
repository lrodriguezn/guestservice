export interface IMenu {
    title: string;
    key_translate:string;
    icon: string;
}

export interface IMenuPage {
    title: string;
    menu:string;
    key_translate:string;
    component: any;
    params?:any;
    icon: string;
    logsOut?: boolean;
    index?: number;
    tabComponent?: any;
}