import { IModel } from "./model";

export interface Company extends IModel{
    nome?:string;
    cnpj?:string;
    patterName?:string;
    endereco?:string;
}