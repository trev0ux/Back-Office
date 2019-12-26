import { FormaPagamentoModel } from "./forma-pagamento.model";

export interface DividirConta {
    valorConta:number;
    valorPago: number;
    valorTroco: number;
    formaPagamento: FormaPagamentoModel;
    valorDesconto:number;
    valorCaixinha:number;
}
