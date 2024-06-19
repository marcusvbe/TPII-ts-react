import Documento from "./documento";
import Endereco from "./endereco";
import Telefone from "./telefone";

export default class Cliente {
    private nome: string;
    private nomeSocial: string;
    private dataNascimento: Date;
    private dataCadastro: Date;
    private telefones: Telefone[] = [];
    private endereco!: Endereco;
    private documentos: Documento[] = [];
    private dependentes: Cliente[] = [];
    private titular!: Cliente;

    constructor(nome: string, nomeSocial: string, dataNascimento: Date) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.dataNascimento = dataNascimento;
        this.dataCadastro = new Date();
    }

    get Nome() { return this.nome; }
    get NomeSocial() { return this.nomeSocial; }
    get DataNascimento() { return this.dataNascimento; }
    get DataCadastro() { return this.dataCadastro; }
    get Telefones() { return this.telefones; }
    get Endereco() { return this.endereco; }
    get Documentos() { return this.documentos; }
    get Dependentes() { return this.dependentes; }
    get Titular() { return this.titular; }

    set Endereco(endereco: Endereco) { this.endereco = endereco; }
    set Nome(nome: string) { this.nome = nome; }
    set NomeSocial(nomeSocial: string) { this.nomeSocial = nomeSocial; }
    set DataNascimento(dataNascimento: Date) { this.dataNascimento = dataNascimento; }
    set Telefones(telefones: Telefone[]) { this.telefones = telefones; }
    set Documentos(documentos: Documento[]) { this.documentos = documentos; }

    // Define o titular deste cliente
    setTitular(titular: Cliente) {
        this.titular = titular;
        // Adiciona este cliente como dependente do titular
        titular.addDependente(this);
    }

    // Adiciona um dependente a este cliente
    addDependente(dependente: Cliente) {
        this.dependentes.push(dependente);
        // Define este cliente como o titular do dependente
        dependente.titular = this;
    }
}