export interface ContaModel {
    codigo: number;
    tipoConta: TipoConta;
    valorConta: number;
    dataVencimento: Date;
    dataPagamento: Date;
    dsComentario: String;
    mesSalario: MesSalarioModel;
}
export interface MesModel {
    codigo: number;
    dsMes: string;
}
export interface MesSalarioModel {
    codigo: number;
    mes: MesModel;
    valorSalario: number
}
export interface Contas {
    id: string;
    tipoConta: TipoConta;
    valorConta: string;
    dataVencimento: string;
    dataPagamento: string;
    dsComentario: String;
}
export interface TipoConta {
    codigo: string;
    nomeTipoConta: string;
    dsTipoConta: string;    
}