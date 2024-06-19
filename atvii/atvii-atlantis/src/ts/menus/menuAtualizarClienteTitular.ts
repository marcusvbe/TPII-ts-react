export default class MenuAtualizarClienteTitular {
    mostrar(): void {
        console.clear();
        console.log(`****************************`);
        console.log(`| Qual o dado do cliente titular que deseja atualizar? `);
        console.log(`----------------------`);
        console.log(`| 1 - Nome`);
        console.log(`| 2 - Nome Social`);
        console.log(`| 3 - Data de Nascimento`);
        console.log(`| 4 - Telefones`);
        console.log(`| 5 - Endereço`);
        console.log(`| 6 - Documentos`);
        console.log(`| 0 - Finalizar atualização do cliente titular`);
        console.log(`----------------------`);
    }
}