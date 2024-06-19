import React, { useState, ChangeEvent } from "react";
import "./estilos/form.css";
import 'materialize-css/dist/css/materialize.min.css';

type Acomodacao = {
    nome: string;
    camaSolteiro: number | null;
    camaCasal: number | null;
    suite: number | null;
    climatizacao: boolean;
    garagem: number | null;
};

const FormularioCadastroAcomodacao = () => {
    const [acomodacaoList, setAcomodacaoList] = useState<Acomodacao[]>([{ nome: "", camaSolteiro: null, camaCasal: null, suite: null, climatizacao: false, garagem: null }]);

    const addAcomodacaoField = () => {
        setAcomodacaoList([...acomodacaoList, { nome: "", camaSolteiro: null, camaCasal: null, suite: null, climatizacao: false, garagem: null }]);
    };

    const handleAcomodacaoChange = (
        e: ChangeEvent<HTMLInputElement>,
        index: number,
        campo: keyof Acomodacao
    ) => {
        const updatedAcomodacaoList = [...acomodacaoList];
        switch (campo) {
            case 'nome':
                updatedAcomodacaoList[index].nome = e.target.value;
                break;
            case 'camaSolteiro':
            case 'camaCasal':
            case 'suite':
            case 'garagem':
                updatedAcomodacaoList[index][campo] = Number(e.target.value);
                break;
            case 'climatizacao':
                updatedAcomodacaoList[index].climatizacao = e.target.checked;
                break;
        }
        setAcomodacaoList(updatedAcomodacaoList);
    };

    return (
        <div className="container">
            <h3 className="center-align">
                Cadastro de Acomodação
            </h3>
            <form>

                {acomodacaoList.map((acomodacao, index) => (
                    <div key={index}>
                        <div className="input-field">
                            <input
                                id={`nome_acomodacao_${index}`}
                                type="text"
                                className="validate"
                                value={acomodacao.nome}
                                onChange={(e) => handleAcomodacaoChange(e, index, "nome")}
                            />
                            <label htmlFor={`nome_acomodacao_${index}`}>Nome da acomodação</label>
                        </div>

                        <div className="input-field">
                            <input
                                id={`cama_solteiro_${index}`}
                                type="number"
                                className="validate"
                                value={acomodacao.camaSolteiro === null ? '' : acomodacao.camaSolteiro}
                                onChange={(e) => handleAcomodacaoChange(e, index, "camaSolteiro")}
                            />
                            <label htmlFor={`cama_solteiro_${index}`}>Camas de solteiro</label>
                        </div>

                        <div className="input-field">
                            <input
                                id={`cama_casal_${index}`}
                                type="number"
                                className="validate"
                                value={acomodacao.camaCasal === null ? '' : acomodacao.camaCasal}
                                onChange={(e) => handleAcomodacaoChange(e, index, "camaCasal")}
                            />
                            <label htmlFor={`cama_casal_${index}`}>Camas de casal</label>
                        </div>

                        <div className="input-field">
                            <input
                                id={`suite_${index}`}
                                type="number"
                                className="validate"
                                value={acomodacao.suite === null ? '' : acomodacao.suite}
                                onChange={(e) => handleAcomodacaoChange(e, index, "suite")}
                            />
                            <label htmlFor={`suite_${index}`}>Suítes</label>
                        </div>

                        <label htmlFor={`climatizacao_${index}`}>Climatização</label>
                        <div className="switch">
                            <label>
                                Não
                                <input
                                    type="checkbox"
                                    checked={acomodacao.climatizacao}
                                    onChange={(e) => handleAcomodacaoChange(e, index, "climatizacao")}
                                />
                                <span className="lever"></span>
                                Sim
                            </label>
                        </div>

                        <div className="input-field">
                            <input
                                id={`garagem_${index}`}
                                type="number"
                                defaultValue={0}
                                className="validate"
                                value={acomodacao.garagem === null ? '' : acomodacao.garagem}
                                onChange={(e) => handleAcomodacaoChange(e, index, "garagem")}
                            />
                            <label htmlFor={`garagem_${index}`}>Vagas de garagem</label>
                        </div>
                    </div>
                ))}
                <button
                    className="btn waves-effect waves-light"
                    type="button"
                    onClick={addAcomodacaoField}
                >
                    Adicionar Acomodação
                </button>

                <div className="center-align">
                    <button className="btn waves-effect waves-light" type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioCadastroAcomodacao;