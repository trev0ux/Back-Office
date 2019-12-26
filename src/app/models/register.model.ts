import { IModel } from './model';

export interface Register extends IModel {
    login: string;
    name: string;
    email: string;
    idEmpresa: string;
    password: string;
    confirma_password: string;
    timestamp: Date;
    role: string;
} 
