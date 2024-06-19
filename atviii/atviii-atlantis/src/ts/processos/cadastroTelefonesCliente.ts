import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Telefone from "../modelos/telefone";

export default class CadastroTelefonesCliente extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.execucao = true
    }

    processar(): void {
        console.log('Iniciando o cadastro de telefones...')
        while (this.execucao) {
            console.log('Coletando os dados do telefone...')
            let ddd = this.entrada.receberTexto('Qual o DDD?')
            let numero = this.entrada.receberTexto('Qual o número do telefone?')
            let telefone = new Telefone(ddd, numero)
            this.cliente.Telefones.push(telefone)

            let continuar = this.entrada.receberTexto('Deseja adicionar outro telefone? (s/n)')
            if (continuar.toLowerCase() !== 's') {
                this.execucao = false
            }
        }
    }
}