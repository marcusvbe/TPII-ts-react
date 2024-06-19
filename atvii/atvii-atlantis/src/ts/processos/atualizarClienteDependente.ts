import Processo from "../abstracoes/processo";
import MenuAtualizarClienteDependente from "../menus/menuAtualizarClienteDependente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import Cliente from "../modelos/cliente";

export default class AtualizarClienteDependente extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.menu = new MenuAtualizarClienteDependente();
        this.execucao = true;
    }

    processar(): void {
        console.log('Inciando a atualização do cliente dependente...');
        while (this.execucao) {
            this.menu.mostrar();
            this.opcao = this.entrada.receberNumero('Qual dado do dependente deseja alterar?');
            switch (this.opcao) {
                case 1:
                    this.cliente.Nome = this.entrada.receberTexto('Qual o novo nome do dependente?');
                    break;
                case 2:
                    this.cliente.NomeSocial = this.entrada.receberTexto('Qual o novo nome social do dependente?');
                    break;
                case 3:
                    this.cliente.DataNascimento = this.entrada.receberData('Qual a nova data de nascimento do dependente?');
                    break;
                case 4:
                    this.cliente.Documentos = [];
                    this.processo = new CadastrarDocumentosCliente(this.cliente);
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