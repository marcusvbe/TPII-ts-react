// src/ts/menus/menuEditarTipoCliente.ts
import Menu from "../interfaces/menu";

export default class MenuEditarTipoCliente implements Menu {
    mostrar(): void {
        console.log(`****************************`)
        console.log(`| Por favor, selecione uma opção...`)
        console.log(`----------------------`)
        console.log(`| 1 - Editar cliente titular`)
        console.log(`| 2 - Editar cliente dependente`)
        console.log(`----------------------`)
        console.log(`****************************`)
    }
}