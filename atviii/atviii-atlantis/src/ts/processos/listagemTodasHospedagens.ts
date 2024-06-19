import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import * as readlineSync from "readline-sync";

export default class ListagemTodasHospedagens extends Processo {
    processar(): void {
        console.clear();
        console.log('Listando todas as hospedagens...');

        Armazem.InstanciaUnica.Hospedagens.forEach(hospedagem => {
            console.log(`Cliente: ${hospedagem.Cliente.Nome}`);
            if (hospedagem.Cliente.Titular) {
                console.log(`Tipo: Dependente`);
                console.log(`Titular: ${hospedagem.Cliente.Titular.Nome}`);
            } else {
                console.log(`Tipo: Titular`);
                if (hospedagem.Cliente.Dependentes.length > 0) {
                    console.log(`Dependentes: ${hospedagem.Cliente.Dependentes.map(dependente => dependente.Nome).join(', ')}`);
                }
            }
            console.log(`Acomodação: ${hospedagem.Acomodacao.NomeAcomadacao}`);
            console.log(`Data inicial da hospedagem: ${hospedagem.DataInicial.toLocaleDateString()}`);
            console.log(`Data final da hospedagem: ${hospedagem.DataFinal.toLocaleDateString()}`);
            console.log('----------------------');
        });
        readlineSync.question('Pressione qualquer tecla para continuar...');
    }
}