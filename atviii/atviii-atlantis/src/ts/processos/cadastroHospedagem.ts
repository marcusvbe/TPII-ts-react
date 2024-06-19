import Processo from "../abstracoes/processo";
import MenuNovaHospedagem from "../menus/menuNovaHospedagem";
import Cliente from "../modelos/cliente";
import Acomodacao from "../modelos/acomodacao";
import Armazem from "../dominio/armazem";
import Hospedagem from "../modelos/hospedagem";

export default class CadastroHospedagem extends Processo {
    private cliente: Cliente;

    constructor() {
        super();
        Armazem.InstanciaUnica.Clientes.forEach((cliente, index) => {
            console.log(`${index + 1}: ${cliente.Nome}`);
        });
        let indexCliente = this.entrada.receberNumero('Selecione um Cliente para definir a acomodação') - 1;
        this.cliente = Armazem.InstanciaUnica.Clientes[indexCliente];
        this.menu = new MenuNovaHospedagem();
    }

    processar(): void {
        this.menu.mostrar();
        let index = this.entrada.receberNumero('Qual a opção desejada?') - 1;
        let acomodacao = Armazem.InstanciaUnica.Acomodacoes[index];

        let dataInicial = this.entrada.receberData('Qual a data de início da hospedagem?');

        let dataFinal = this.entrada.receberData('Qual a data de término da hospedagem?');

        let hospedagem = new Hospedagem(this.cliente, acomodacao, dataInicial, dataFinal);
        Armazem.InstanciaUnica.Hospedagens.push(hospedagem);
    }
}