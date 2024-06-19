import ImpressorTelefone from "./impressorTelefone";

export default class ImpressorTelefones {
    private telefones: { Ddd: string, Numero: string }[];
    private impressor!: ImpressorTelefone;

    constructor(telefones: { Ddd: string, Numero: string }[]) {
        this.telefones = telefones;
    }

    imprimir(): string {
        let impressao = ``;
        for (let index = 0; index < this.telefones.length; index++) {
            this.impressor = new ImpressorTelefone(this.telefones[index]);
            if (index == 0) {
                impressao = impressao + `${this.impressor.imprimir()}`;
            }
            else {
                impressao = impressao + `\n${this.impressor.imprimir()}`;
            }
        }
        return impressao;
    }
}