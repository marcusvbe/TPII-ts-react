import Menu from "../interfaces/menu";

export default class MenuEditarClienteTitular implements Menu {
    mostrar(): void {
        console.log(`****************************`)
        console.log(`| Por favor, selecione uma opção para editar no cliente...`)
        console.log(`----------------------`)
        console.log(`| 1 - Nome`)
        console.log(`| 2 - Nome Social`)
        console.log(`| 3 - Data de Nascimento`)
        console.log(`| 4 - Documentos`)
        console.log(`| 5 - Telefones`)
        console.log(`----------------------`)
        console.log(`| 0 - Voltar ao menu anterior`)
        console.log(`----------------------`)
    }
}