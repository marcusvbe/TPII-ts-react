import Processo from "../abstracoes/processo";
import Telefone from "../modelos/telefone";
import Cliente from "../modelos/cliente";

export default class CadastroTelefoneCliente extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        console.log('Inciando o cadastro de telefone...');
        let continuar = 's';
        while (continuar.toLowerCase() === 's') {
            let ddd = this.entrada.receberTexto('Digite o DDD:');
            let numero = this.entrada.receberTexto('Digite o número de telefone:');
            let telefone = new Telefone(ddd, numero);
            this.cliente.Telefones.push(telefone);
            continuar = this.entrada.receberTexto('Deseja adicionar outro número? (s/n)');
        }
    }
}