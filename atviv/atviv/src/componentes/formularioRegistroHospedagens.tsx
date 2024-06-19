import React, { useState, useEffect } from "react";
import M from 'materialize-css';

type Cliente = {
    nome: string;
    cpf: string;
};

type Acomodacao = {
    nome: string;
};

type Hospedagem = {
    id: number;
    cliente: Cliente | null;
    acomodacao: Acomodacao | null;
    checkIn: string;
    checkOut: string;
};

const FormularioRegistroHospedagens: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([
        { nome: 'Joao', cpf: "123456789" },
        { nome: 'Antonio', cpf: "987654321" },
    ]);

    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([
        { nome: "Casal Simples" },
        { nome: "Família Simples" },
        { nome: "Família Mais" },
        { nome: "Família Super" },
        { nome: "Solteiro Simples" },
        { nome: "Solteiro Mais" },
    ]);

    const [hospedagens, setHospedagens] = useState<Hospedagem[]>([
        { id: 0, cliente: null, acomodacao: null, checkIn: '', checkOut: '' }
    ]);

    const addHospedagemField = () => {
        setHospedagens(prevHospedagens => {
            const newHospedagem = {
                id: prevHospedagens.length,
                cliente: null,
                acomodacao: null,
                checkIn: '',
                checkOut: ''
            };
            return [...prevHospedagens, newHospedagem];
        });

        setTimeout(() => {
            M.AutoInit();
        }, 0);
    };

    const handleClienteChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const { value } = event.target;
        setHospedagens(prevState => {
            const updatedHospedagens = [...prevState];
            updatedHospedagens[index].cliente = value ? (clientes.find(cliente => cliente.nome === value) || null) : null;
            return updatedHospedagens;
        });
    };

    const handleAcomodacaoChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const { value } = event.target;
        setHospedagens(prevState => {
            const updatedHospedagens = [...prevState];
            updatedHospedagens[index].acomodacao = value ? (acomodacoes.find(acomodacao => acomodacao.nome === value) || null) : null;
            return updatedHospedagens;
        });
    };

    const handleCheckInChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target;
        setHospedagens(prevState => {
            const updatedHospedagens = [...prevState];
            updatedHospedagens[index].checkIn = value;
            return updatedHospedagens;
        });
    };

    const handleCheckOutChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target;
        setHospedagens(prevState => {
            const updatedHospedagens = [...prevState];
            updatedHospedagens[index].checkOut = value;
            return updatedHospedagens;
        });
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    useEffect(() => {
        M.AutoInit();
    }, []);

    return (
        <div className="container">
            <h3 className="title">Registrar Hospedagem</h3>
            <form onSubmit={handleSubmit}>
                {hospedagens.map((hospedagem, index) => (
                    <div key={index}>
                        <div className="input-field">
                            <select id="cliente" name="cliente" value={hospedagem.cliente?.nome || ''}
                                    onChange={(e) => handleClienteChange(e, index)}>
                                <option value="" disabled>Selecionar cliente</option>
                                {clientes.map((cliente, index) => (
                                    <option key={index} value={cliente.nome}>Nome: {cliente.nome} -
                                        CPF: {cliente.cpf}</option>
                                ))}
                            </select>
                            <label htmlFor="cliente">CLIENTE</label>
                        </div>
                        <div className="input-field">
                            <select id="acomodacao" name="acomodacao" value={hospedagem.acomodacao?.nome || ''}
                                    onChange={(e) => handleAcomodacaoChange(e, index)}>
                                <option value="" disabled>Selecionar acomodação</option>
                                {acomodacoes.map((acomodacao, index) => (
                                    <option key={index} value={acomodacao.nome}>{acomodacao.nome}</option>
                                ))}
                            </select>
                            <label htmlFor="acomodacao">ACOMODAÇÃO</label>
                        </div>
                        <div className="input-field">
                            <input id="checkIn" name="checkIn" type="date" className="validate"
                                   value={hospedagem.checkIn}
                                   onChange={(e) => handleCheckInChange(e, index)}/>
                            <label htmlFor="checkIn">Check-in</label>
                        </div>
                        <div className="input-field">
                            <input id="checkOut" name="checkOut" type="date" className="validate"
                                   value={hospedagem.checkOut} onChange={(e) => handleCheckOutChange(e, index)}/>
                            <label htmlFor="checkOut">Check-out</label>
                        </div>
                    </div>
                ))}

                <button
                    className="btn waves-effect waves-light"
                    type="button"
                    onClick={addHospedagemField}
                >
                    Adicionar Hospedagem
                </button>
                <div className="center-align">
                    <button className="btn waves-effect waves-light" type="submit">
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormularioRegistroHospedagens;