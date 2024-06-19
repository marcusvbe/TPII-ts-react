import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";

export default class CadastroClienteDependente extends Processo {
    constructor() {
        super();
    }

    processar(): void {
        console.log('Iniciando o cadastro de um novo cliente dependente...');
        let nomeTitular: string;
        let armazem = Armazem.InstanciaUnica;
        let titular: Cliente | undefined;
        while (!titular) {
            nomeTitular = this.entrada.receberTexto('Qual o nome do titular do novo cliente dependente?');
            titular = armazem.Clientes.find(c => c.Nome === nomeTitular);
            if (!titular) {
                console.log('Titular não encontrado... Tente novamente.');
            }
        }
        let nome = this.entrada.receberTexto('Qual o nome do novo cliente dependente?');
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente dependente?');
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento do dependente?');
        let cliente = new Cliente(nome, nomeSocial, dataNascimento);
        this.processo = new CadastrarDocumentosCliente(cliente);
        this.processo.processar();
        cliente.setTitular(titular);
        // Clona o endereço do titular para o cliente dependente
        let enderecoTitular = titular.Endereco;
        let endereco = enderecoTitular.clonar();
        cliente.Endereco = endereco;
        // Clona os telefones do titular para o cliente dependente
        let telefonesDoTitular = titular.Telefones;
        telefonesDoTitular.forEach(t => {
            let clonado = t.clonar();
            cliente.Telefones.push(clonado);
        });
        armazem.Clientes.push(cliente);
        console.log('Finalizando o cadastro do cliente dependente...');
    }
}