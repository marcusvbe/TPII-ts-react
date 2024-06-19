import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ExcluirCliente extends Processo {
    processar(): void {
        console.log('Iniciando a exclusão de um cliente...');

        // List existing Cliente objects for the user to select from
        Armazem.InstanciaUnica.Clientes.forEach((cliente, index) => {
            console.log(`${index + 1}: ${cliente.Nome}`);
        });

        console.log('0: Voltar'); // Add an option to go back

        let index = this.entrada.receberNumero('Selecione um Cliente para excluir ou 0 para voltar') - 1;

        // Check if the user wants to go back
        if (index === -1) {
            console.log('Voltando ao menu anterior...');
            return;
        }

        // Check if the index is valid
        if (index < 0 || index >= Armazem.InstanciaUnica.Clientes.length) {
            console.log('Índice inválido. Por favor, insira um número correspondente a um Cliente válido.');
            return;
        }

        // Remove the selected client
        Armazem.InstanciaUnica.Clientes.splice(index, 1);

        console.log('Cliente excluído com sucesso.');
    }
}