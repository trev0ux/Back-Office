import { IModel } from './model';

export interface MetodoPagamento{
    method:string;
    brands:[string];
    discountValue:number;
    daysToReturn:number;
    bussinessDay:boolean;
}

export interface ContratoPgto extends IModel {
    name: string;
    idEmpresa: string;
    methods: Array<MetodoPagamento>
}
