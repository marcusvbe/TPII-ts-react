import Processo from "../abstracoes/processo";
import MenuTipoListagemClientes from "../menus/menuTipoListagemClientes";
import ListagemTitulares from "./listagemTitulares";
import ListagemDependentes from "./listagemDependentes";
import Armazem from "../dominio/armazem";

export default class TipoListagemClientes extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoListagemClientes()
    }

    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new ListagemTitulares()
                this.processo.processar()
                break
            case 2:
                if (Armazem.InstanciaUnica.Clientes.length === 0) {
                    console.log('Não há clientes para listar.');
                    return;
                }
                Armazem.InstanciaUnica.Clientes.forEach((cliente, index) => {
                    if (cliente.Titular == undefined) {
                        console.log(`${index + 1}: ${cliente.Nome}`);
                    }
                });
                let index = this.entrada.receberNumero('Selecione um Cliente para listar seus dependentes') - 1;
                while (index < 0 || index >= Armazem.InstanciaUnica.Clientes.length) {
                    console.log('Índice inválido. Por favor, insira um número correspondente a um Cliente válido.');
                    index = this.entrada.receberNumero('Selecione um Cliente para listar seus dependentes') - 1;
                }
                let titular = Armazem.InstanciaUnica.Clientes[index];
                this.processo = new ListagemDependentes(titular);
                this.processo.processar();
                break;
            case 3:
                console.log('Retornando ao menu anterior...');
                return; // Return to the previous menu
            default:
                console.log('Opção não entendida... :(')
        }
    }
}