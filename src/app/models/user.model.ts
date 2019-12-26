import { IModel } from "./model";

export interface User extends IModel{
    name?:string;
    uid?:string;
    regId?: String,
    email?: string;
    password?: string;
    role?: string;
    cpf?: string,
    phone?: string,
    idade?: string,
    sexo?: string,
    whatsApp?: string,
    endereco?: string,
    cep?: string,
    complemento?: string,
    segmento?: string,
    mensagem?: string,
    experiencia?: string,
    comoachou?: string,
    possuiCursos?: string,
    timestamp?: number,
    idEmpresa?: number,
    fileAntecedentesCriminais?: string,
    confirma_password?: string,
    fileName?: string
}