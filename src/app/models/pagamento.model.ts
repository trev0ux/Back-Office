import { IModel } from "./model";

export interface Cliente extends IModel{
    login?                : string;
    name?                 : string;
    regId?                : string;
    cpf?                  : string;
    email?                : string;
    nascimento?           :string;
    endereco?             :string;
    contato?              :string;
    efetivo?              :boolean;
}