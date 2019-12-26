import { DiaFaturamento } from "./dia-faturamento.model";

export interface RankingProdutosDia {
    descricaoProduto: string;
    lucroPorDiaMap:Map<number, number>;
    lucroPorDia:DiaFaturamento[];
}