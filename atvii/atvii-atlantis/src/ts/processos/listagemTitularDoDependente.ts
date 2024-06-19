import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorCliente from "../impressores/impressorCliente";
import Cliente from "../modelos/cliente";

export default class ListagemTitularDoDependente extends Processo {
    private clientes: Cliente[];

    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        console.clear();
        console.log('Iniciando a listagem do titular do dependente...');
        let dependente: Cliente | undefined = undefined;
        while (!dependente) {
            let nomeDependente = this.entrada.receberTexto('Qual o nome do dependente?');
            dependente = this.clientes.find(c => c.Nome === nomeDependente);
            if (!dependente) {
                console.log('Dependente não encontrado... Tente novamente.');
            }
        }
        if (dependente && dependente.Titular) {
            console.log(`Titular do dependente ${dependente.Nome}:`);
            let impressor = new ImpressorCliente(dependente.Titular);
            console.log(impressor.imprimir());
        }
        else {
            console.log('Dependente não possui um titular.');
        }
    }
}