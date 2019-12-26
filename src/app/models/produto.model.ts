import { IModel } from './model';

export interface Produto extends IModel {
    name?: string;
    description?: string;
    discount?: number;
    idEmpresa?: string;
    valor?: number;
    type?: string;
    order?: string;
    idSection?:string;
    section?: any;
    image?: string;
    imagePrincipal?: string;
    fileImage?: string;
    serviceTime?: string;
    discountPlatinum?: number;
    discountSilver?: number;
    typeCompany?: string;
    minimalCustomerConsumer?: number;
    maxCustomerConsumer?: number;
}
