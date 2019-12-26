import { IModel } from './model';

export interface Section extends IModel {
    name: string;
    order: number;
    idEmpresa: string;
}
