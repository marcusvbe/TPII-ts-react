import React, { useState } from "react";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import "./estilos/lista.css";
import "materialize-css/dist/css/materialize.min.css";

type Cliente = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    telefones: string[];
};

type Acomodacao = {
    nome: string;
    camaSolteiro: number;
    camaCasal: number;
    suite: number;
    climatizacao: string;
    garagem: number;
};

type Hospedagem = {
    id: number;
    cliente: Cliente;
    acomodacao: Acomodacao;
    checkIn: string;
    checkOut: string;
};

const ListaDeHospedagens: React.FC = () => {
    const [hospedagens, setHospedagens] = useState<Hospedagem[]>([
        {
            id: 1,
            cliente: { nome: 'Joao', nomeSocial: 'Jao', cpf: '123.456.789-00', telefones: ['(31) 98765-4321', '(31) 91234-5678'] },
            acomodacao: { nome: "Casal Simples", camaSolteiro: 0, camaCasal: 1, suite: 1, climatizacao: 'Sim', garagem: 1 },
            checkIn: '2022-01-01',
            checkOut: '2022-01-15'
        },
        {
            id: 2,
            cliente: { nome: 'Antonio', nomeSocial: 'Tonho', cpf: '987.654.321-00', telefones: ['(31) 97654-3210', '(31) 91234-5678'] },
            acomodacao: { nome: "Família Simples", camaSolteiro: 1, camaCasal: 1, suite: 1, climatizacao: 'Sim', garagem: 1 },
            checkIn: '2022-02-01',
            checkOut: '2022-02-12'
        },
    ]);

    const [visibleClientDetails, setVisibleClientDetails] = useState<number | null>(null);
    // Add a new state variable to control which accommodation's details are visible
    const [visibleAccommodationDetails, setVisibleAccommodationDetails] = useState<number | null>(null);

    const toggleClientDetails = (id: number) => {
        if (visibleClientDetails === id) {
            setVisibleClientDetails(null);
        } else {
            setVisibleClientDetails(id);
        }
    };

    const toggleAccommodationDetails = (id: number) => {
        if (visibleAccommodationDetails === id) {
            setVisibleAccommodationDetails(null);
        } else {
            setVisibleAccommodationDetails(id);
        }
    };

    const parseDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    return (
        <div className="container">
            <h3 className="title">Hospedagens</h3>
            <ul className="collection">
                {hospedagens.map((hospedagem) => (
                    <li key={hospedagem.id} className="collection-item avatar">
                        <div>
                            <a href="#" className="title" style={{fontSize: '1.5em'}}
                               onClick={() => toggleClientDetails(hospedagem.id)}>Nome: {hospedagem.cliente.nome}</a>
                            {visibleClientDetails === hospedagem.id && (
                                <>
                                    <p style={{fontSize: '1.5em'}}>Nome Social: {hospedagem.cliente.nomeSocial}</p>
                                    <p style={{fontSize: '1.5em'}}>CPF: {hospedagem.cliente.cpf}</p>
                                    {hospedagem.cliente.telefones.map((telefone, index) => (
                                        <p key={index} style={{fontSize: '1.5em'}}>Telefone {index + 1}: {telefone}</p>
                                    ))}
                                </>
                            )}
                        </div>
                        <div>
                            <a href="#" style={{fontSize: '1.5em'}}
                               onClick={() => toggleAccommodationDetails(hospedagem.id)}>Acomodação: {hospedagem.acomodacao.nome}</a>
                            {visibleAccommodationDetails === hospedagem.id && (
                                <>
                                    <p style={{fontSize: '1.5em'}}>Camas de
                                        Solteiro: {hospedagem.acomodacao.camaSolteiro}</p>
                                    <p style={{fontSize: '1.5em'}}>Camas de Casal: {hospedagem.acomodacao.camaCasal}</p>
                                    <p style={{fontSize: '1.5em'}}>Suítes: {hospedagem.acomodacao.suite}</p>
                                    <p style={{fontSize: '1.5em'}}>Climatização: {hospedagem.acomodacao.climatizacao}</p>
                                    <p style={{fontSize: '1.5em'}}>Garagem: {hospedagem.acomodacao.garagem}</p>
                                </>
                            )}
                        </div>
                        <p style={{fontSize: '1.5em'}}>Data de check-in: {parseDate(hospedagem.checkIn).toLocaleDateString()}</p>
                        <p style={{fontSize: '1.5em'}}>Data de check-out: {parseDate(hospedagem.checkOut).toLocaleDateString()}</p>
                        <div className="secondary-content">
                            <button type="button" className="btn-floating btn-small waves-effect waves-light red"
                                    onClick={() => {
                                        console.log("Excluindo hospedagem");
                                    }}>
                                <AiFillDelete style={{fontSize: 20}}/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaDeHospedagens;