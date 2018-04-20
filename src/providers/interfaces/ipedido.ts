import { IProducto } from './iproducto';

export interface IPedido {
    code:string,
    fecha: string;
    detalles: string;
    productos:Array<IProducto>;
    estado:string;
}
