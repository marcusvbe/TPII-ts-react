import Menu from "../interfaces/menu";

export default class MenuEditarClienteTitular implements Menu {
    mostrar(): void {
        console.log(`****************************`)
        console.log(`| Por favor, selecione uma opção para editar no cliente (OBSERVAÇÂO: o endereço do cliente dependente é o mesmo de seu titular. Portanto, naõ pode ser editado): `)
        console.log(`----------------------`)
        console.log(`| 1 - Nome`)
        console.log(`| 2 - Nome Social`)
        console.log(`| 3 - Data de Nascimento`)
        console.log(`| 4 - Endereço`)
        console.log(`| 5 - Documentos`)
        console.log(`| 6 - Telefones`)
        console.log(`----------------------`)
        console.log(`| 0 - Voltar ao menu anterior`)
        console.log(`----------------------`)
    }
}