import Impressor from "../interfaces/impressor";
import Telefone from "../modelos/telefone";

export default class ImpressorTelefones implements Impressor {
    private telefones: Telefone[]

    constructor(telefones: Telefone[]) {
        this.telefones = telefones
    }

    imprimir(): string {
        let impressao = '| Telefones:';
        this.telefones.forEach(telefone => {
            impressao += `\n(${telefone.Ddd}) ${telefone.Numero}`;
        });
        return impressao;
    }
}