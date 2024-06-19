import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import M from "materialize-css";

import "./estilos/lista.css";
import "materialize-css/dist/css/materialize.min.css";

interface Acomodacao {
    nome: string;
    camaSolteiro: number;
    camaCasal: number;
    suite: number;
    climatizacao: string;
    garagem: number;
}

type Props = {};

const ListaDeAcomodacoes: React.FC<Props> = () => {
    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([
        { nome: "Casal Simples", camaSolteiro: 0, camaCasal: 1, suite: 1, climatizacao: 'Sim', garagem: 1 },
        { nome: "Família Simples", camaSolteiro: 2, camaCasal: 1, suite: 1, climatizacao: 'Sim', garagem: 1 },
        { nome: "Família Mais", camaSolteiro: 5, camaCasal: 1, suite: 2, climatizacao: 'Sim', garagem: 2 },
        { nome: "Família Super", camaSolteiro: 6, camaCasal: 2, suite: 3, climatizacao: 'Sim', garagem: 2 },
        { nome: "Solteiro Simples", camaSolteiro: 1, camaCasal: 0, suite: 1, climatizacao: 'Sim', garagem: 0 },
        { nome: "Solteiro Mais", camaSolteiro: 0, camaCasal: 1, suite: 1, climatizacao: 'Sim', garagem: 1 },
    ]);

    const [selectedAcomodacao, setSelectedAcomodacao] = useState<Acomodacao | null>(null);

    useEffect(() => {
        M.AutoInit();
    }, []);

    const handleShowInfoModal = (acomodacao: Acomodacao) => {
        setSelectedAcomodacao(acomodacao); // Set the selected accommodation when opening the modal
        const elem = document.getElementById(`modal-${acomodacao.nome}`);
        if (elem !== null) {
            const instance = M.Modal.getInstance(elem);
            instance.open();
        }
    };

    const handleCloseInfoModal = () => {
        setSelectedAcomodacao(null);
    };


    return (
        <div className="container">
            <h3 className="title" >Acomodações</h3>
            <ul className="collection">
            {acomodacoes.map((acomodacao, index) => (
                <li key={index} className="collection-item avatar">
                    <a
                        href="#modal-info"
                        className="title"
                        style={{fontSize: '1.5em'}}
                        onClick={() => handleShowInfoModal(acomodacao)}
                    >
                        {acomodacao.nome}
                    </a>
                    <div className="secondary-content">
                        <button
                            onClick={() => console.log("Deletar Acomodação")}
                            type="button"
                            className="btn-floating btn-small waves-effect waves-light red"
                        >
                            <AiFillDelete style={{fontSize: 20}}/>
                        </button>
                    </div>

                    {/* Modal para mostrar informações da acomodação */}
                    <div id={`modal-${acomodacao.nome}`} className="modal">
                        {selectedAcomodacao && (
                            <div className="modal-content">
                                <h4>Detalhes da acomodação</h4>
                                <p style={{fontSize: '1.5em'}}>
                                    <strong>Nome:</strong> {selectedAcomodacao.nome}
                                </p>
                                <p style={{fontSize: '1.5em'}}>
                                    <strong>Cama de solteiro:</strong>{" "}
                                    {selectedAcomodacao.camaSolteiro}
                                </p>
                                <p style={{fontSize: '1.5em'}}>
                                    <strong>Cama de casal:</strong> {selectedAcomodacao.camaCasal}
                                </p>
                                <p style={{fontSize: '1.5em'}}>
                                    <strong>Suíte:</strong> {selectedAcomodacao.suite}
                                </p>
                                <p style={{fontSize: '1.5em'}}>
                                    <strong>Climatização:</strong> {selectedAcomodacao.climatizacao}
                                </p>
                                <p style={{fontSize: '1.5em'}}>
                                    <strong>Garagem:</strong> {selectedAcomodacao.garagem}
                                </p>
                            </div>
                        )}
                        <div className="modal-footer">
                            <button
                                className="btn waves-effect waves-light modal-close"
                                onClick={handleCloseInfoModal}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default ListaDeAcomodacoes;