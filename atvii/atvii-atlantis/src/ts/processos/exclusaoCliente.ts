import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class ExclusaoCliente extends Processo {
    private clientes: Cliente[];

    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        console.clear();
        console.log('Iniciando a exclusão de um cliente...');
        let index: number = -1;
        let nomeCliente: string;
        while (index === -1) {
            nomeCliente = this.entrada.receberTexto('Qual o nome do cliente a ser excluído?');
            index = this.clientes.findIndex(c => c.Nome === nomeCliente);
            if (index === -1) {
                console.log('Cliente não encontrado... Tente novamente.');
            }
        }
        let cliente = this.clientes[index];
        // Se o cliente é um dependente, remova-o da lista de dependentes do titular
        if (cliente.Titular) {
            let indexDependente = cliente.Titular.Dependentes.findIndex(d => d.Nome === nomeCliente);
            if (indexDependente !== -1) {
                cliente.Titular.Dependentes.splice(indexDependente, 1);
            }
        }
        // Se o cliente é um titular, remova-o e seus dependentes
        if (cliente.Dependentes) {
            cliente.Dependentes.forEach(d => {
                let indexDependente = this.clientes.findIndex(c => c.Nome === d.Nome);
                if (indexDependente !== -1) {
                    this.clientes.splice(indexDependente, 1);
                }
            });
        }
        // Remova o cliente da lista de clientes
        this.clientes.splice(index, 1);
        // @ts-ignore
        console.log(`Cliente ${nomeCliente} excluído com sucesso.`);
    }
}