import { FormaPagamentoModel } from "./forma-pagamento.model";

export interface  FaturamentoCartao {
    valorAReceber:number;
    contrato:FormaPagamentoModel;
    fechamentos:any[];
}