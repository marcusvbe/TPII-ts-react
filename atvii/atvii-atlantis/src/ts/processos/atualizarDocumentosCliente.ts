import Processo from "../abstracoes/processo";
import MenuTipoDocumento from "../menus/menuTipoDocumento";
import CadastroCPF from "./cadastroCPF";
import CadastroPassaporte from "./cadastroPassaporte";
import CadastroRg from "./cadastroRg";
import Cliente from "../modelos/cliente";

export default class AtualizarDocumentosCliente extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.menu = new MenuTipoDocumento();
        this.execucao = true;
    }

    processar(): void {
        console.log('Iniciando a atualização de documentos...');
        while (this.execucao) {
            this.menu.mostrar();
            this.opcao = this.entrada.receberNumero('Qual opção desejada?');
            switch (this.opcao) {
                case 1:
                    this.processo = new CadastroRg(this.cliente);
                    this.processo.processar();
                    break;
                case 2:
                    this.processo = new CadastroCPF(this.cliente);
                    this.processo.processar();
                    break;
                case 3:
                    this.processo = new CadastroPassaporte(this.cliente);
                    this.processo.processar();
                    break;
                case 0:
                    this.execucao = false;
                    break;
                default:
                    console.log('Opção não entendida :(');
            }
        }
    }
}