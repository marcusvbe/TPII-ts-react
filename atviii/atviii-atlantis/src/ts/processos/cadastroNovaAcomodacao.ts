import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao";
import ImpressorAcomodacao from "../impressores/impressorAcomodacao";
import DiretorNovaAcomodacao from "../diretores/diretorNovaAcomodacao";

export default class CadastroNovaAcomodacao extends Processo {
    processar(): void {
        console.log('Acomodações existentes:');
        Armazem.InstanciaUnica.Acomodacoes.forEach(acomodacao => {
            let impressor = new ImpressorAcomodacao(acomodacao);
            console.log(impressor.imprimir());
        });

        let nomeAcomodacao: string | null;
        do {
            nomeAcomodacao = this.entrada.receberTexto('Digite o nome da acomodação:');
            if (Armazem.InstanciaUnica.Acomodacoes.some(acomodacao => acomodacao.NomeAcomadacao === NomeAcomadacao[nomeAcomodacao as keyof typeof NomeAcomadacao])) {
                console.log('Uma acomodação com esse nome já existe. Por favor, escolha um nome diferente.');
                nomeAcomodacao = null;
            }
        } while (!nomeAcomodacao || Armazem.InstanciaUnica.Acomodacoes.some(acomodacao => acomodacao.NomeAcomadacao === NomeAcomadacao[nomeAcomodacao as keyof typeof NomeAcomadacao]));

        let camaSolteiro = this.entrada.receberNumero('Digite o número de camas de solteiro:');
        let camaCasal = this.entrada.receberNumero('Digite o número de camas de casal:');
        let climatizacao = this.entrada.receberBooleano('A acomodação possui climatização? :');
        let garagem = this.entrada.receberNumero('Digite o número de vagas na garagem:');
        let suite = this.entrada.receberNumero('Digite o número de suítes:');

        let diretor = new DiretorNovaAcomodacao(
            NomeAcomadacao[nomeAcomodacao as keyof typeof NomeAcomadacao],
            camaSolteiro,
            camaCasal,
            suite,
            climatizacao,
            garagem
        );

        let novaAcomodacao = diretor.construir();

        Armazem.InstanciaUnica.Acomodacoes.push(novaAcomodacao);
        console.log('Acomodação criada com sucesso!');
    }
}