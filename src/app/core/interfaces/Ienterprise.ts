import { IMap } from './Imap';
import { IGallery } from './Igallery'
import { IApp } from './Iapp'

export interface IEnterprise {
    code: string,
    name: string,
    description:string,
    country:string,
    city:string, 
    address:string,
    tel:string,
    mobile:string,
    fax:string,
    email:string,
    web:string,
    urlApi:string,
    urlImage:string,
    app:IApp[],
    gallery:IGallery[],
    map:IMap,
    active:Boolean,
    user_type:string,
    user_membership_id:string,
    user_pass:string,
    user_token:string
}