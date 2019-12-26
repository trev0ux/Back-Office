import { IModel } from './model';
import { TipoFormaPagamento } from './enums/tipo-forma-pagamento';

export interface FormaPagamento extends IModel {
  nome: string;
  tipo: TipoFormaPagamento;
  diasRepasse: number;
  valorTaxa: number;
  ativo: boolean;
  idEmpresa: string;
  section: any;
}
