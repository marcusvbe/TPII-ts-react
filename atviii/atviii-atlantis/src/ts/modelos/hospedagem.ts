import Cliente from "./cliente";
import Acomodacao from "./acomodacao";

export default class Hospedagem {
    private cliente: Cliente;
    private acomodacao: Acomodacao;
    private dataInicial: Date;
    private dataFinal: Date;

    constructor(cliente: Cliente, acomodacao: Acomodacao, dataInicial: Date, dataFinal: Date) {
        this.cliente = cliente;
        this.acomodacao = acomodacao;
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
    }

    public get Cliente() { return this.cliente; }
    public get Acomodacao() { return this.acomodacao; }
    public get DataInicial() { return this.dataInicial; }
    public get DataFinal() { return this.dataFinal; }
}