

import { IModel } from './model';

export interface Professional extends IModel {
    name?: string;
    uid?: string;
    regId?: String;
    email?: string;
    password?: string;
    confirma_password?: string;
    role?: string;
    sexo?: string;
    dataNascimento?: any;
    rg?: string;
    cpf?: string;
    phone?: string;
    whatsApp?: string;
    instagram?: string;
    endereco?: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    complemento?: string;
    segmento?: string;
    mensagem?: string;
    experiencia?: string;
    comoachou?: string;
    possuiCursos?: string;
    possuiMateriais?: string;
    produtosUtilizados?: string;
    timestamp?: number;
    idEmpresa?: number;
    fileAntecedentesCriminais?: string;
    fileName?: string;
    fileCertificados?: any[];
    fileNameCertificados?: any[];
    comoTrabalha?: string;
    sobre?: string;
    listDeletarCertificado?: string[];
    products?: any[];
}
