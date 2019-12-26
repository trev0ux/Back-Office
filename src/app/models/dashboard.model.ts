import { RankingProdutos } from "./ranking-produtos.model";
import { RankingProdutosDia } from "./ranking-produtos-dia.model";
import { VolumeVendas } from "./volume-vendas.model";
import { DiaPagamento } from "./dia-pagamento";

export interface Dashboard {
    rankingProdutos: RankingProdutos[];
    rankingProdutosDia: RankingProdutosDia[];
    volumeVendas: VolumeVendas;
    valorCaixinha:number;
    valorDesconto:number;
    valorTicketMedio:number;
    relatorioPagamentoCartao:DiaPagamento[];
    qtdTotalProdutosVendidos:number;
    ValorTotalProdutosVendidos:number;
    ValorTotalRecebimentosFuturosCartao:number;
}