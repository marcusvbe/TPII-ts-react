import React, { useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from 'materialize-css';

type Props = {
    buttons: string[],
    seletorView: Function
}

const Menu: React.FC<Props> = ({ buttons, seletorView }) => {

    useEffect(() => {
        M.AutoInit();
    }, []);

    const createMenuItems = () => {
        if (buttons.length <= 0) {
            return <></>;
        } else {
            let itens = buttons.map(valor => (
                <li key={valor} className="tab">
                    <a href="#" onClick={(e) => seletorView(valor, e)} style={{ fontSize: '18px' }}>
                        {valor}
                    </a>
                </li>
            ));
            return itens;
        }
    }

    return (
        <>
            <nav className="menu-color">
                <div className="nav-wrapper">
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i
                        className="material-icons">menu</i></a>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <ul className="left hide-on-med-and-down" style={{ paddingLeft: '10px' }}>
                            {createMenuItems()}
                        </ul>
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <a href="#" onClick={(e) => seletorView('Cadastro de Cliente', e)}
                                   style={{fontSize: '18px'}}>
                                    Cadastro de Cliente
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => seletorView('Cadastro de Acomodação', e)}
                                   style={{fontSize: '18px'}}>
                                    Cadastro de Acomodação
                                </a>
                            </li>

                        </ul>
                    </div>
                    <ul className="sidenav" id="mobile-demo">
                        {createMenuItems()}
                        <li>
                            <a href="#" onClick={(e) => seletorView('Cadastro de Cliente', e)}
                               style={{fontSize: '18px'}}>
                                Cadastro de Cliente
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={(e) => seletorView('Cadastro de Acomodação', e)}
                               style={{fontSize: '18px'}}>
                                Cadastro de Acomodação
                            </a>
                        </li>

                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Menu;