import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import MenuTipoAtualizarCliente from "../menus/menuTipoAtualizarCliente";
import AtualizarClienteDependente from "./atualizarClienteDependente";
import AtualizarClienteTitular from "./atualizarClienteTitular";
import Cliente from "../modelos/cliente";

export default class TipoAtualizarCliente extends Processo {
    constructor() {
        super();
        this.menu = new MenuTipoAtualizarCliente();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Digite a opção desejada?');
        switch (this.opcao) {
            case 1:
                let cliente: Cliente | null = null;
                while (!cliente) {
                    let nomeCliente = this.entrada.receberTexto('Qual o nome do cliente titular a ser atualizado?');
                    cliente = this.buscarCliente(nomeCliente);
                    if (!cliente) {
                        console.log('Cliente não encontrado... Tente novamente.');
                    }
                }
                this.processo = new AtualizarClienteTitular(cliente);
                this.processo.processar();
                break;
            case 2:
                let nomeTitular: string;
                let titular: Cliente | null = null;
                while (!titular) {
                    nomeTitular = this.entrada.receberTexto('Qual o nome do cliente titular do dependente a ser atualizado?');
                    titular = this.buscarCliente(nomeTitular);
                    if (!titular) {
                        console.log('Titular não encontrado... Tente novamente.');
                    }
                }
                let dependente: Cliente | undefined = undefined;
                while (!dependente) {
                    let nomeDependente = this.entrada.receberTexto('Qual o nome do dependente a ser atualizado?');
                    dependente = titular!.Dependentes.find(d => d.Nome === nomeDependente);
                    if (!dependente) {
                        console.log('Dependente não encontrado... Tente novamente.');
                    }
                }
                this.processo = new AtualizarClienteDependente(dependente);
                this.processo.processar();
                break;
        }
    }

    buscarCliente(nome: string): Cliente | null {
        let clientes = Armazem.InstanciaUnica.Clientes;
        for (let cliente of clientes) {
            if (cliente.Nome === nome) {
                return cliente;
            }
        }
        return null;
    }
}