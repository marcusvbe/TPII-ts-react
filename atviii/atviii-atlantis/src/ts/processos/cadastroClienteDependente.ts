import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastroDocumentosCliente from "./cadastroDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import Endereco from "../modelos/endereco";
import CadastroTelefonesCliente from "./cadastroTelefonesCliente";

export default class CadastroClienteDependente extends Processo {
    private titular: Cliente;

    constructor(titular: Cliente) {
        super();
        this.titular = titular;
    }

    processar(): void {
        console.log('Iniciando o cadastro de um novo dependente...');
        let nome = this.entrada.receberTexto('Qual o nome do novo dependente?');
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo dependente?');
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?');
        let dependente = new Cliente(nome, nomeSocial, dataNascimento);
        dependente.Titular = this.titular;

        this.titular.addDependente(dependente);

        dependente.Endereco = this.titular.Endereco.clonar();


        this.processo = new CadastroDocumentosCliente(dependente);
        this.processo.processar();

        this.processo = new CadastroTelefonesCliente(dependente)
        this.processo.processar()

        let armazem = Armazem.InstanciaUnica;
        armazem.Clientes.push(dependente);

        console.log('Finalizando o cadastro do dependente...');
    }
}