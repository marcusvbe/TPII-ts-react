import Processo from "../abstracoes/processo";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemDependentes extends Processo {
    private titular: Cliente;
    private impressor!: Impressor;

    constructor(titular: Cliente) {
        super();
        this.titular = titular;
    }

    processar(): void {
        console.clear();
        if (this.titular.Dependentes.length === 0) {
            console.log('O titular selecionado não possui dependentes.');
            return;
        }
        console.log('Iniciando a listagem dos dependentes do titular...');
        this.titular.Dependentes.forEach(dependente => {
            this.impressor = new ImpressaorCliente(dependente);
            console.log(this.impressor.imprimir());
        });
    }
}