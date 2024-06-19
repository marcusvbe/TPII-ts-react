import Processo from "../abstracoes/processo";
import MenuTipoCadastroCliente from "../menus/menuTipoCadastroCliente";
import CadastroClienteTitular from "./cadastroClienteTitular";
import CadastroClienteDependente from "./cadastroClienteDependente";
import Armazem from "../dominio/armazem";
import CadastroHospedagem from "./cadastroHospedagem";

export default class TipoCadastroCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoCadastroCliente()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        
        switch (this.opcao) {
            case 1:
                this.processo = new CadastroClienteTitular()
                this.processo.processar()
                break
            case 2:
                // List existing Cliente objects for the user to select from
                Armazem.InstanciaUnica.Clientes.forEach((cliente, index) => {
                    console.log(`${index + 1}: ${cliente.Nome}`);
                });
                let index = this.entrada.receberNumero('Selecione um Cliente ao qual o dependente será adicionado') - 1;
                let titular = Armazem.InstanciaUnica.Clientes[index];
                this.processo = new CadastroClienteDependente(titular)
                this.processo.processar()
                break
            case 3:
                // List existing Cliente objects for the user to select from
                Armazem.InstanciaUnica.Clientes.forEach((cliente, index) => {
                    console.log(`${index + 1}: ${cliente.Nome}`);
                });
                let indexCliente = this.entrada.receberNumero('Selecione um Cliente para definir a acomodação') - 1;
                let cliente = Armazem.InstanciaUnica.Clientes[indexCliente];
                this.processo = new CadastroHospedagem()
                this.processo.processar()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}