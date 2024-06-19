import React, { useState } from 'react';
import Menu from './menu';

import ListaCliente from './listaDeClientes';
import FormularioCadastroCliente from './formularioCadastroCliente';

import ListaDeAcomodacoes from './listaDeAcomodacoes';
import FormularioCadastroAcomodacao from './formularioCadastroAcomodacao';

import ListaDeHospedagens from "./listaDeHospedagens";
import FormularioRegistroHospedagens from './formularioRegistroHospedagens';

import Home from './home';

const Roteador: React.FC = () => {
    const [tela, setTela] = useState('Home');

    const selecionarView = (novaTela: string, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setTela(novaTela);
    }

    const menu = (
        <Menu
            seletorView={selecionarView}
            buttons={['Home', 'Clientes', 'Acomodações', 'Hospedagens', 'Registro de Hospedagem']}
        />
    );

    switch (tela) {
        case 'Home':
            return (
                <>
                    {menu}
                    <Home />
                </>
            );
        case 'Clientes':
            return (
                <>
                    {menu}
                    <ListaCliente />
                </>
            );

        case 'Acomodações':
            return (
                <>
                    {menu}
                    <ListaDeAcomodacoes />
                </>
            );
        case 'Hospedagens':
            return (
                <>
                    {menu}
                    <ListaDeHospedagens />
                </>
            );
        case 'Registro de Hospedagem':
            return (
                <>
                    {menu}
                    <FormularioRegistroHospedagens />
                </>
            );
            case 'Cadastro de Cliente':
            return (
                <>
                    {menu}
                    <FormularioCadastroCliente />
                </>
            );
        case 'Cadastro de Acomodação':
            return (
                <>
                    {menu}
                    <FormularioCadastroAcomodacao />
                </>
            );
        default:
            return (
                <>
                    {menu}
                    <Home />
                </>
            );
    }
}

export default Roteador;