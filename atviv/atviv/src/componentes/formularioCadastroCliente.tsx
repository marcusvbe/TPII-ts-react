import React, { useState, useEffect, ChangeEvent } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import "./estilos/lista.css";
import "materialize-css/dist/css/materialize.min.css";
import M from 'materialize-css';

type TelefoneInfo = {
    telefone: string;
};

type DocumentInfo = {
    type: 'CPF' | 'RG' | 'Passaporte';
    value: string;
    dataEmissao: string;
};

const NovoCliente = () => {
    const [documentList, setDocumentList] = useState<DocumentInfo[]>([{ type: 'CPF', value: "", dataEmissao: "" }]);
    const [telefoneList, setTelefoneList] = useState<TelefoneInfo[]>([{ telefone: "" }]);
    const [dataCadastro, setDataCadastro] = useState<Date | null>(null);
    const [endereco, setEndereco] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [nomeSocial, setNomeSocial] = useState<string>("");


    type Client = {
        nome: string;
        nomeSocial: string;
        endereco: string;
        dataCadastro: Date | null; // Allow null values
        documentList: DocumentInfo[];
        telefoneList: TelefoneInfo[];
        tipo: 'Titular' | 'Dependente';
        cpfDependente?: string[];
        cpfTitular?: string;
    };

    const [tipo, setTipo] = useState<'Titular' | 'Dependente'>('Titular');
    const [cpfDependente, setCpfDependente] = useState<string[]>([""]);
    const [cpfTitular, setCpfTitular] = useState<string>("");
    const [tipoDocumento, setTipoDocumento] = useState('');

    const [clients, setClients] = useState<Client[]>([{
        documentList: [{ type: 'CPF', value: "", dataEmissao: "" }],
        telefoneList: [{ telefone: "" }],
        dataCadastro: null,
        endereco: "",
        nome: "",
        nomeSocial: "",
        tipo: 'Titular',
        cpfDependente: [""],
        cpfTitular: ""
    }]);

    const initializeMaterialize = () => {
        M.AutoInit();
    };

    useEffect(() => {
        initializeMaterialize();
    }, []);

    const addDocumentField = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();
        setDocumentList([
            ...documentList,
            { type: "CPF", value: "", dataEmissao: "" },
        ]);
        setTimeout(() => {
            initializeMaterialize();
        }, 0);
    };


    const handleDocumentChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number, campo: keyof DocumentInfo) => {
        const value = e.target.value as "CPF" | "RG" | "Passaporte";
        e.preventDefault(); // Prevent form submission
        setDocumentList(prevState => {
            const updatedDocumentList = [...prevState];
            updatedDocumentList[index][campo] = value;
            return updatedDocumentList;
        });
    };

    const addTelefoneField = () => {
        setTelefoneList([...telefoneList, { telefone: "" }]);
    };


    const handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        e.preventDefault(); // Prevent form submission
        setTelefoneList(prevState => {
            const updatedTelefoneList = [...prevState];
            updatedTelefoneList[index].telefone = value;
            return updatedTelefoneList;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newClient: Client = {
            nome,
            nomeSocial,
            endereco,
            dataCadastro: new Date(),
            documentList,
            telefoneList,
            tipo,
            cpfDependente: tipo === 'Titular' ? cpfDependente : undefined,
            cpfTitular: tipo === 'Dependente' ? cpfTitular : undefined,
        };
        setClients([...clients, newClient]);
        // Reset form fields
        setNome("");
        setNomeSocial("");
        setEndereco("");
        setDocumentList([{ type: 'CPF', value: "", dataEmissao: "" }]);
        setTelefoneList([{ telefone: "" }]);
        setTipo('Titular');
        setCpfDependente([""]);
        setCpfTitular("");
    };

    const addCliente = () => {
        setClients([...clients, {
            documentList: [{ type: 'CPF', value: "", dataEmissao: "" }],
            telefoneList: [{ telefone: "" }],
            dataCadastro: null,
            endereco: "",
            nome: "",
            nomeSocial: "",
            tipo: 'Titular',
            cpfDependente: [""],
            cpfTitular: ""
        }]);
    };

    // Reinitialize Materialize CSS after state update
    setTimeout(() => {
        M.AutoInit();
    }, 0);


    return (
        <div className="container">
            <h3 className="title">Cadastrar Cliente</h3>
            {clients.map((client, index) => (
                <form key={index} onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input id="nome" type="text" className="validate" value={nome}
                               onChange={(e) => setNome(e.target.value)}/>
                        <label htmlFor="nome" className={nome ? 'active' : ''}>Nome</label>
                    </div>

                    <div className="input-field">
                        <input id="nomeSocial" type="text" className="validate" value={nomeSocial}
                               onChange={(e) => setNomeSocial(e.target.value)}/>
                        <label htmlFor="nomeSocial" className={nomeSocial ? 'active' : ''}>Nome Social</label>
                    </div>
                    <div className="input-field">
                        <select onChange={(e) => setTipo(e.target.value as 'Titular' | 'Dependente')}>
                            <option value="Titular">Titular</option>
                            <option value="Dependente">Dependente</option>
                        </select>
                        <label>Tipo de Cliente</label>
                    </div>
                    {tipo === 'Dependente' && (
                        <div className="input-field">
                            <input id="cpf_titular" type="text" className="validate" value={cpfTitular}
                                   onChange={(e) => setCpfTitular(e.target.value)}/>
                            <label htmlFor="cpf_titular" className={cpfTitular ? 'active' : ''}>CPF do Titular</label>
                        </div>
                    )}

                    <div className="input-field">
                        <input id="endereco" type="text" className="validate" value={endereco}
                               onChange={(e) => setEndereco(e.target.value)}/>
                        <label htmlFor="endereco" className={endereco ? 'active' : ''}>Endereço:</label>
                    </div>

                    {documentList.map((doc, index) => (
                        <div key={index}>
                            <div className="input-field">
                                <select value={doc.type} onChange={(e) => handleDocumentChange(e, index, "type")}>
                                    <option value="CPF">CPF</option>
                                    <option value="RG">RG</option>
                                    <option value="Passaporte">Passaporte</option>
                                </select>
                                <label>Tipo de documento</label>
                            </div>
                            <div className="input-field">
                                <input id={`doc_value_${index}`} type="text" className="validate" value={doc.value}
                                       onChange={(e) => handleDocumentChange(e, index, "value")}/>
                                <label htmlFor={`doc_value_${index}`} className={doc.value ? 'active' : ''}>Número do
                                    documento</label>
                            </div>
                            <div className="input-field">
                                <input id={`doc_date_${index}`} type="date" className="validate"
                                       value={doc.dataEmissao}
                                       onChange={(e) => handleDocumentChange(e, index, "dataEmissao")}/>
                                <label htmlFor={`doc_date_${index}`} className={doc.dataEmissao ? 'active' : ''}>Data de
                                    emissão do documento</label>
                            </div>
                        </div>
                    ))}
                    <button className="btn waves-effect waves-light" type="button"
                            onClick={addDocumentField}>Adicionar Documento
                    </button>

                    {telefoneList.map((telefone, index) => (
                        <div key={index} className="input-field">
                            <input id={`telefone_${index}`} type="text" className="validate"
                                   value={telefone.telefone} onChange={(e) => handleTelefoneChange(e, index)}/>
                            <label htmlFor={`telefone_${index}`}
                                   className={telefone.telefone ? 'active' : ''}>Telefone</label>
                        </div>
                    ))}
                    <button className="btn waves-effect waves-light" type="button"
                            onClick={addTelefoneField}>Adicionar Telefone
                    </button>

                </form>
            ))}
            <br></br>
            <br></br>
            <button className="btn waves-effect waves-light" type="button" onClick={addCliente}>Adicionar Cliente
            </button>
            <br></br>
            <br></br>
            <div className="modal-footer" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button className="btn waves-effect waves-light modal-close" type="button">Cadastrar</button>
            </div>
            <div id="modal-produto" className="modal">

                <div className="modal-footer">
                    <button className="btn waves-effect waves-light modal-close" type="button">Fechar</button>
                </div>
            </div>

        </div>
    );
};

export default NovoCliente;