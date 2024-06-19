import Processo from "../abstracoes/processo";
import MenuEditarTipoCliente from "../menus/menuEditarTipoCliente";
import EditarClienteTitular from "./editarClienteTitular";
import EditarClienteDependente from "./editarClienteDependente";

export default class EditarTipoCliente extends Processo {
    menu: MenuEditarTipoCliente;

    constructor() {
        super();
        this.menu = new MenuEditarTipoCliente();
    }

    processar(): void {
        this.menu.mostrar();
        let opcao = this.entrada.receberNumero('Selecione uma opção:');

        switch (opcao) {
            case 1:
                let editarClienteTitular = new EditarClienteTitular();
                editarClienteTitular.processar();
                break;
            case 2:
                let editarClienteDependente = new EditarClienteDependente();
                editarClienteDependente.processar();
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }
}