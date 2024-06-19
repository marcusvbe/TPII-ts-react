import Diretor from "../abstracoes/diretor";
import Acomodacao from "../modelos/acomodacao";
import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao";
import ConstrutorAcomodacao from "../construtores/construtorAcomodacao";

export default class DiretorNovaAcomodacao extends Diretor<Acomodacao> {
    constructor(
        private nomeAcomodacao: NomeAcomadacao,
        private camaSolteiro: number,
        private camaCasal: number,
        private suite: number,
        private climatizacao: boolean,
        private garagem: number
    ) {
        super();
        this.construtor = new ConstrutorAcomodacao();
    }

    public construir(): Acomodacao {
        let objetoConstrutor = this.construtor as ConstrutorAcomodacao;
        objetoConstrutor.NomeAcomodacao = this.nomeAcomodacao;
        objetoConstrutor.CamaSolteiro = this.camaSolteiro;
        objetoConstrutor.CamaCasal = this.camaCasal;
        objetoConstrutor.Suite = this.suite;
        objetoConstrutor.Climatizacao = this.climatizacao;
        objetoConstrutor.Garagem = this.garagem;
        return objetoConstrutor.construir();
    }
}