import { FaturamentoCartao } from "./faturamento-cartao";
import { FormaPagamentoModel } from "./forma-pagamento.model";

export interface DiaPagamento {
    data:Date;
    diaSemana:String;
    valorTotal:number;
    contratos:FormaPagamentoModel[];
    faturamentoCartao:FaturamentoCartao[];
}