import { IModel } from "./model";
import { Cliente } from "./cliente.model";
import { Professional } from "./professional.model";
import { Produto } from "./produto.model";

export interface Event extends IModel{
    textSeek?               : string;
    details?                : string;
    phone?                  : string;
    email?                  : string;
    // ['domicilio', 'corporativo', 'avaliativo'],
    type?                   : string;
    adress?                 : string;
    geoLat?                 : string;
    geoLong?                : string;
    startDate?              : Date;
    endDate?                : Date;
    // [ 'Novo', 'Agendado', 'Executando', 'Finalizado', 'Cancelado', 'Não Realizado' ]
    status?                 : string,
    professionalAttendence? : Professional [],
    client?                 : Cliente [],
    products?               : Produto [],
    duration?               : number,
    // ['hour', 'day', 'minute'],
    typeDuration?           : string,
    timeStampLastModified?  : string,
    uuidUserLastModified?   : string,
}