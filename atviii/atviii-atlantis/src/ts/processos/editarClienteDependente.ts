import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import MenuEditarClienteTitular from "../menus/menuEditarClienteTitular";
import Documento from "../modelos/documento";
import Telefone from "../modelos/telefone";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Armazem from "../dominio/armazem";
import CadastroTelefonesCliente from "./cadastroTelefonesCliente";
import CadastroDocumentosCliente from "./cadastroDocumentosCliente";

export default class EditarClienteDependente extends Processo {
    private cliente: Cliente;
    menu: MenuEditarClienteTitular;

    constructor() {
        super();
        Armazem.InstanciaUnica.Clientes.forEach((cliente, index) => {
            if (cliente.Titular) { // Only list "Dependente" clients
                console.log(`${index + 1}: ${cliente.Nome}`);
            }
        });
        let indexCliente = this.entrada.receberNumero('Selecione um Cliente Dependente para editar') - 1;
        this.cliente = Armazem.InstanciaUnica.Clientes[indexCliente];
        this.menu = new MenuEditarClienteTitular();
    }

    processar(): void {
        let opcao;
        do {
            this.menu.mostrar();
            opcao = this.entrada.receberNumero('Selecione uma opção: ');

            switch (opcao) {
                case 1:
                    let novoNome = this.entrada.receberTexto('Digite o novo nome do cliente:');
                    this.cliente.Nome = novoNome;
                    break;
                case 2:
                    let novoNomeSocial = this.entrada.receberTexto('Digite o novo nome social do cliente:');
                    this.cliente.NomeSocial = novoNomeSocial;
                    break;
                case 3:
                    let novaDataNascimento = this.entrada.receberData('Digite a nova data de nascimento do cliente:');
                    this.cliente.DataNascimento = novaDataNascimento;
                    break;
                case 4:
                    this.cliente.Documentos = [];
                    let cadastroDocumentos = new CadastroDocumentosCliente(this.cliente);
                    cadastroDocumentos.processar();
                    break;
                case 5:
                    this.cliente.Telefones = [];
                    let cadastroTelefones = new CadastroTelefonesCliente(this.cliente);
                    cadastroTelefones.processar();
                    break;
                case 0:
                    console.log('Saindo da edição do cliente...');
                    break;
                default:
                    console.log('Opção não entendida :(');
            }
        } while (opcao !== 0);
    }
}