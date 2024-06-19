import Processo from "../abstracoes/processo"
import MenuPrincipal from "../menus/menuPricipal"
import ListagemAcomodacoes from "./listagemAcomodacoes"
import TipoCadastroCliente from "./tipoCadastroCliente"
import TipoListagemClientes from "./tipoListagemClientes"
import Armazem from "../dominio/armazem";
import CadastroHospedagem from "./cadastroHospedagem";
import ListagemTodasHospedagens from "./listagemTodasHospedagens";
import ListagemHospedagensAtuais from "./listagemHospedagensAtuais";
import EditarTipoCliente from "./editarTipoCliente";
import CadastroNovaAcomodacao from "./cadastroNovaAcomodacao";
import ExcluirCliente from "./excluirCliente";

export default class Principal extends Processo {
    constructor() {
        super()
        this.execucao = true
        this.menu = new MenuPrincipal()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Selecione uma opção: ')
        switch (this.opcao) {
            case 1:
                this.processo = new TipoCadastroCliente()
                this.processo.processar()
                break
            case 2:
                this.processo = new EditarTipoCliente();
                this.processo.processar();
            case 3:
                this.processo = new TipoListagemClientes()
                this.processo.processar()
                break
            case 4:
                this.processo = new ExcluirCliente()
                this.processo.processar()
            case 5:
                this.processo = new ListagemTodasHospedagens();
                this.processo.processar();
                break;
            case 6:
                this.processo = new ListagemHospedagensAtuais()
                this.processo.processar()
                break
            case 7:
                this.processo = new ListagemAcomodacoes()
                this.processo.processar()
                break
            case 8:
                this.processo = new CadastroHospedagem()
                this.processo.processar()
                break
            case 0:
                this.execucao = false
                console.log('Até logo!')
                console.clear()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}
