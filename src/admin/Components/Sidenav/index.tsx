import React, { useState } from 'react';
import './styles.css';
import {GiHamburgerMenu} from 'react-icons/gi'
import { arrayNavCadastros, arrayNavPerfis } from '../../dashboard/utils/arrayNavDashboard';
const ex_pfp = require('../../../assets/images/pfp-dashboard-ex.png');

const DashboardSidenav = () =>{

    const [collapsed, setCollapse] = useState(false);

    return(
        <div className="sidenav-container">
            <div className={`${collapsed ? 'sidenav-collapsed' : 'sidenav-open'} sidenav`}>
                <div className="sidenav-header">
                    <button className="toggle-collapse" onClick={() => setCollapse(!collapsed)}>
                        <GiHamburgerMenu/>
                    </button>
                    <div className={`${collapsed ? 'h-[50px] w-[50px]' : "h-[80px] w-[80px]"} pfp-container`}>
                        <img src={ex_pfp} alt="" />
                    </div>
                    <div className={`${collapsed ? 'invisible opacity-0' : ''} user-info`}>
                        <span>Renan Figueredo</span>
                        <div className="user-role">
                            <span>Administrador | renan@gmail.com</span>
                        </div>
                    </div>
                </div>
                <ul className="nav-list">
                    <li className={`${collapsed ? 'invisible opacity-0' : ''} nav-item`}>
                        <a href="">Início</a>
                    </li>
                
                    <span className={`${collapsed ? 'invisible opacity-0' : ''} sidenav-title`}>
                        Gerenciar Cadastros
                    </span>
                    { arrayNavCadastros.map((item: any) =>{
                        return (
                            <li className={`${collapsed ? 'invisible opacity-0' : ''} nav-item`}>
                                <a href="">{item.name}</a>
                            </li>
                        )
                    }) }
                    <span className={`${collapsed ? 'invisible opacity-0' : ''} sidenav-title`}>
                        Gerenciar Perfis
                    </span>
                    { arrayNavPerfis.map((item: any) =>{
                        return (
                            <li className={`${collapsed ? 'invisible opacity-0' : ''} nav-item`}>
                                <a href="">{item.name}</a>
                            </li>
                        )
                    }) }
                </ul>
                {/* </div>      */}
            </div>
        </div>
    )
}

export default DashboardSidenav;