import Processo from "../abstracoes/processo";
import MenuAtualizarClienteTitular from "../menus/menuAtualizarClienteTitular";
import CadastroTelefoneCliente from "./cadastroTelefoneCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import Cliente from "../modelos/cliente";

export default class AtualizarClienteTitular extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.menu = new MenuAtualizarClienteTitular();
        this.execucao = true;
    }

    processar(): void {
        console.log('Inciando a atualização do cliente titular...');
        while (this.execucao) {
            this.menu.mostrar();
            this.opcao = this.entrada.receberNumero('Qual dado do cliente deseja alterar?');
            switch (this.opcao) {
                case 1:
                    this.cliente.Nome = this.entrada.receberTexto('Qual o novo nome do cliente?');
                    break;
                case 2:
                    this.cliente.NomeSocial = this.entrada.receberTexto('Qual o novo nome social do cliente?');
                    break;
                case 3:
                    this.cliente.DataNascimento = this.entrada.receberData('Qual a nova data de nascimento do cliente?');
                    break;
                case 4:
                    this.cliente.Telefones = [];
                    this.processo = new CadastroTelefoneCliente(this.cliente);
                    this.processo.processar();
                    // atribuir os telefone novos aos dependentes do cliente, se houver
                    this.cliente.Dependentes.forEach(dependente => {
                        dependente.Telefones = this.cliente.Telefones;
                    });
                    break;
                case 5:
                    this.processo = new CadastroEnderecoTitular(this.cliente);
                    this.processo.processar();
                    // atribuir o endereço novo aos dependentes do cliente, se houver
                    this.cliente.Dependentes.forEach(dependente => {
                        dependente.Endereco = this.cliente.Endereco;
                    });
                    break;
                case 6:
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