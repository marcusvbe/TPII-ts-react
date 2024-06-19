export default class Telefone {
    private ddd: string;
    private numero: string;

    constructor(ddd: string, numero: string) {
        this.ddd = ddd;
        this.numero = numero;
    }

    clonar(): Telefone {
        let telefone = new Telefone(this.ddd, this.numero);
        return telefone;
    }

    get Ddd() { return this.ddd; }
    get Numero() { return this.numero; }
}