import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";

let cliente = new Cliente()
cliente.nome = `Pedro de Alcântara João Carlos Leopoldo Salvador`
cliente.nomeSocial = `Dom Pedro II`
cliente.dataCadastro = new Date(1840, 6, 23)
cliente.dataNascimento = new Date(1825, 11, 2)

let endereco = new Endereco()
endereco.rua = `R. do Catete`
endereco.bairro = `Copacabana`
endereco.cidade = `Rio de Janeiro`
endereco.estado = `Rio de Janeiro`
endereco.pais = `Brasil`
endereco.codigoPostal = `22220-000`
cliente.endereco = endereco

let telefone = new Telefone();
telefone.ddd = `21`;
telefone.numero = `98888-5555`;
cliente.telefones.push(telefone);

let telefone2 = new Telefone();
telefone2.ddd = `21`;
telefone2.numero = `3030-3030`;
cliente.telefones.push(telefone2);

let dependente = new Cliente()
dependente.nome = `Isabel Cristina Leopoldina Augusta Micaela`
dependente.nomeSocial = `Princesa Isabel`
dependente.dataCadastro = new Date(1921, 10, 14)
dependente.dataNascimento = new Date(1846, 6, 29)
dependente.endereco = (cliente.endereco.clonar() as Endereco)

for (let tel of cliente.telefones) {
    dependente.telefones.push(tel.clonar());
}

dependente.titular = cliente
cliente.dependentes.push(dependente)

console.log(cliente.telefones);
console.log(dependente.telefones);
