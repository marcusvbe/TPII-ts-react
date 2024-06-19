import Menu from "../interfaces/menu";
import Armazem from "../dominio/armazem";

export default class MenuNovaHospedagem implements Menu {
    mostrar(): void {
        console.clear();
        console.log('Por favor, escolha uma acomodação:');
        Armazem.InstanciaUnica.Acomodacoes.forEach((acomodacao, index) => {
            console.log(`${index + 1}: ${acomodacao.NomeAcomadacao}`);
        });
    }
}