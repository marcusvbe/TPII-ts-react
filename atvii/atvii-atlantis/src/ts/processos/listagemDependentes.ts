import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorCliente from "../impressores/impressorCliente";
import Cliente from "../modelos/cliente";

export default class ListagemDependentes extends Processo {
    private clientes: Cliente[];

    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        console.clear();
        console.log('Iniciando a listagem dos dependentes...');
        let nomeTitular: string;
        let titular: Cliente | undefined;
        while (!titular) {
            nomeTitular = this.entrada.receberTexto('Qual o nome do titular?');
            titular = this.clientes.find(c => c.Nome === nomeTitular);
            if (!titular) {
                console.log('Titular não encontrado... Tente novamente.');
            }
        }
        console.log(`Dependentes do titular ${titular!.Nome}:`);
        titular!.Dependentes.forEach(dependente => {
            let impressor = new ImpressorCliente(dependente);
            console.log(impressor.imprimir());
        });
    }
}