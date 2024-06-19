export default class ImpressorTelefone {
    private telefone: { Ddd: string, Numero: string };

    constructor(telefone: { Ddd: string, Numero: string }) {
        this.telefone = telefone;
    }

    imprimir(): string {
        let impressao = `| Telefone:\n`
            + `| DDD: ${this.telefone.Ddd}\n`
            + `| Número: ${this.telefone.Numero}`;
        return impressao;
    }
}