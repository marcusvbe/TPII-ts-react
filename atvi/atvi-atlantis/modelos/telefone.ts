export default class Telefone {
    public ddd: string;
    public numero: string;

    clonar(): Telefone {
        let telefone = new Telefone();
        telefone.ddd = this.ddd;
        telefone.numero = this.numero;
        return telefone;
    }
}