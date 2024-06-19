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

const ListaCliente = () => {
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showProdutoModal, setShowProdutoModal] = useState(false);
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
        dataCadastro: Date;
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

    const [clients, setClients] = useState<Client[]>([
        {
            nome: 'Joao',
            nomeSocial: 'Jao',
            endereco: 'Rua Azul, 123 - Bairro Verde - Belo Horizonte - MG',
            dataCadastro: new Date(),
            documentList: [{ type: 'CPF', value: "123456789", dataEmissao: "2003-03-03" }],
            telefoneList: [{ telefone: "12 34567890" }],
            tipo: 'Titular',
            cpfDependente: ['987654321'],
        },
        {
            nome: 'Antonio',
            nomeSocial: 'Tonho',
            endereco: 'Rua Roxa, 456 - Bairro Amarelo - Belo Horizonte - MG',
            dataCadastro: new Date(),
            documentList: [{ type: 'CPF', value: "987654321", dataEmissao: "2002-02-02" }],
            telefoneList: [{ telefone: "11 987654321" }],
            tipo: 'Dependente',
            cpfTitular: '123456789',
        },
    ]);

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
    };

    useEffect(() => {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }, [documentList]);


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



    const handleShowInfoModal = (client: typeof clients[0]) => {
        // Set the state variables with the data of the clicked client
        setNome(client.nome);
        setNomeSocial(client.nomeSocial);
        setEndereco(client.endereco);
        setDataCadastro(client.dataCadastro);
        setDocumentList(client.documentList.map((doc) => ({
            ...doc,
            type: doc.type as "CPF" | "RG" | "Passaporte",
            dataEmissao: new Date(doc.dataEmissao.split('-').reverse().join('-')).toLocaleDateString('pt-BR')
        })));
        setTelefoneList(client.telefoneList);

        setTipo(client.tipo);
        if (client.tipo === 'Titular') {
            setCpfDependente(client.cpfDependente || [""]);
        } else {
            setCpfTitular(client.cpfTitular || "");
        }

        // Open the modal
        const elem = document.getElementById('modal-cliente');
        if (elem !== null) {
            const instance = M.Modal.getInstance(elem);
            instance.open();
        }
    };

    const handleCloseInfoModal = () => {
        setShowInfoModal(false);
    };

    const handleShowEditModal = (client: typeof clients[0], event: React.MouseEvent) => {
        event.preventDefault();

        // Set the state variables with the data of the clicked client
        setNome(client.nome);
        setNomeSocial(client.nomeSocial);
        setEndereco(client.endereco);
        setDataCadastro(client.dataCadastro);
        setDocumentList(client.documentList.map((doc) => ({
            ...doc,
            type: doc.type as "CPF" | "RG" | "Passaporte",
            dataEmissao: doc.dataEmissao
        })));
        setTelefoneList(client.telefoneList);

        setTipo(client.tipo);

        setTipoDocumento(client.documentList[0]?.type || 'CPF');

        if (client.tipo === 'Titular') {
            setCpfDependente(client.cpfDependente || [""]);
        } else {
            setCpfTitular(client.cpfTitular || "");
        }

        // Open the modal
        const elem = document.getElementById('modal-atualizar');
        if (elem !== null) {
            const instance = M.Modal.getInstance(elem);
            instance.open();
        }
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };


    return (
        <div className="container">
            <div id="modal-cliente" className="modal">
                <div className="modal-content">
                    <h4 style={{fontSize: '1.5em'}}>Dados do cliente</h4>
                    <p style={{fontSize: '1.5em'}}>Nome: {nome}</p>
                    <p style={{fontSize: '1.5em'}}>Nome Social: {nomeSocial}</p>
                    <p style={{fontSize: '1.5em'}}>Tipo de Cliente: {tipo}</p>
                    {tipo === 'Titular' && cpfDependente &&
                        <p style={{fontSize: '1.5em'}}>CPF de Dependente(s): {cpfDependente.join(', ')}</p>}
                    {tipo === 'Dependente' && cpfTitular &&
                        <p style={{fontSize: '1.5em'}}>CPF do Titular: {cpfTitular}</p>}
                    <p style={{fontSize: '1.5em'}}>Endereço: {endereco}</p>
                    <p style={{fontSize: '1.5em'}}>Data de Cadastro: {dataCadastro?.toLocaleDateString('pt-BR')}</p>
                    {documentList.map((doc, index) => (
                        <div key={index}>
                            <p style={{fontSize: '1.5em'}}>Tipo de documento: {doc.type}</p>
                            <p style={{fontSize: '1.5em'}}>Número do documento: {doc.value}</p>
                            <p style={{fontSize: '1.5em'}}>Data de emissão do
                                documento: {new Date(doc.dataEmissao).toLocaleDateString('pt-BR')}</p>
                        </div>
                    ))}
                    {telefoneList.map((telefone, index) => (
                        <div key={index}>
                            <p style={{fontSize: '1.5em'}}>Telefone(s): {telefone.telefone}</p>
                        </div>
                    ))}
                </div>
                <div className="modal-footer">
                    <button className="btn waves-effect waves-light modal-close" type="button">Fechar</button>
                </div>
            </div>

            <div id="modal-atualizar" className="modal">
                <div className="modal-content">
                    <h4>Atualizar cliente</h4>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <div className="input-field">
                            <input id="nome" type="text" className="validate" value={nome}
                                   onChange={(e) => setNome(e.target.value)}/>
                            <label htmlFor="nome" className={nome ? 'active' : ''}>Nome:</label>
                        </div>

                        <div className="input-field">
                            <input id="nome_social" type="text" className="validate" value={nomeSocial}
                                   onChange={(e) => setNomeSocial(e.target.value)}/>
                            <label htmlFor="nome_social" className={nomeSocial ? 'active' : ''}>Nome social:</label>
                        </div>
                        <div className="input-field">
                            <select value={tipo} onChange={(e) => setTipo(e.target.value as 'Titular' | 'Dependente')}>
                                <option value="Titular">Titular</option>
                                <option value="Dependente">Dependente</option>
                            </select>
                            <label>Tipo de Cliente</label>
                        </div>

                        {tipo === 'Dependente' && (
                            <div className="input-field">
                                <input id="cpf_titular" type="text" className="validate" value={cpfTitular}
                                       onChange={(e) => setCpfTitular(e.target.value)}/>
                                <label htmlFor="cpf_titular" className={cpfTitular ? 'active' : ''}>CPF do
                                    Titular</label>
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
                                    <label htmlFor={`doc_value_${index}`} className={doc.value ? 'active' : ''}>Número
                                        do documento</label>
                                </div>
                                <div className="input-field">
                                    <input id={`doc_date_${index}`} type="date" className="validate"
                                           value={doc.dataEmissao}
                                           onChange={(e) => handleDocumentChange(e, index, "dataEmissao")}/>
                                    <label htmlFor={`doc_date_${index}`} className={doc.dataEmissao ? 'active' : ''}>Data
                                        de emissão do documento</label>
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

                        <div className="input-field center-align">
                            <button className="btn waves-effect waves-light" type="button">Atualizar</button>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn waves-effect waves-light modal-close" type="button">Finalizar</button>
                </div>
            </div>

            <div className="conteudo">
                <h3 className="title">Clientes</h3>
                <ul className="collection">
                    {clients.map((client, index) => (
                        <li key={index} className="collection-item avatar">
                            <a
                                href="#"
                                className="title"
                                style={{fontSize: '1.5em'}}
                                onClick={() => handleShowInfoModal(client)}
                            >
                                {client.nome}
                            </a>
                            <div className="secondary-content">
                                <button onClick={(event) => handleShowEditModal(client, event)} type="button"
                                        className="btn-floating btn-small waves-effect waves-light blue">
                                    <AiFillEdit style={{fontSize: 20}}/>
                                </button>
                                <button onClick={() => console.log("Deletar Cliente")} type="button"
                                        className="btn-floating btn-small waves-effect waves-light red">
                                    <AiFillDelete style={{fontSize: 20}}/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ListaCliente;