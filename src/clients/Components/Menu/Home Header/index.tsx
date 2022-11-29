import React, { useState } from 'react'
import { arrayNavItems } from '../../../../utils/NavItems';
import { useTheme } from '../../../../utils/Hooks/useTheme';
import Sidebar from '../Sidebar/index'
import headerVideo from './../../../../assets/videos/banner-home-run-cinematic.mp4'
import './styles.css';
import { BiSearch } from 'react-icons/bi';
import { RiMenuFill } from 'react-icons/ri';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ImAccessibility, ImContrast } from 'react-icons/im';
import { TbArrowBigDown, TbArrowBigTop } from 'react-icons/tb';
const brandLogo = require('../../../../assets/images/fullSportLogo.png');
const carrinhoIcon = require('../../../../assets/icons/carrinho-icon.png');
const suporteIcon = require('../../../../assets/icons/help-icon.png');
const contaIcon = require('../../../../assets/icons/conta-icon.png');
const Icone = styled.div`
    background-color: #796969;
    height: 27px;
    width: 27px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: auto;
    margin-left: auto;
    font-size: 22px;
`;
const HomeHeader = () => {

    const [collapsed, setCollapse] = useState(false);
    const { theme, setTheme } = useTheme();
    const user = JSON.parse(localStorage.getItem('user') as string);

    function openTeste() {
        let sidebar = document.querySelector('.header-side');
        var isSideOpen = sidebar?.classList.contains('show-sidebar')
        isSideOpen ? sidebar?.classList.remove("show-sidebar") : sidebar?.classList.toggle("hideShow")
    }
    function showToggleOpts() {
        let toggleAcess = document.querySelector('.toggle-group');
        var isDisplayed = toggleAcess?.classList.contains('hideShow')
        isDisplayed ? toggleAcess?.classList.remove("hideShow") : toggleAcess?.classList.toggle("hideShow")
    }

    function MostrarImagemPerfil() {
        if (user) {
            if (user.imagemPerfil === null || user.imagemPerfil === undefined) {
                return <Icone className="icone">
                    <p className="text-black">{user.nome.charAt(0)}</p>
                </Icone>
            } else {
                return <img src={user.imagemPerfil.url} />
            }
        } else {
            return <img src={contaIcon} />
        }
    }

    function editarInfoConta(){
        if (user) {
           let userDetails = document.querySelector('.user-options-home');
           let isDisplayed = userDetails?.classList.contains('hide');
           isDisplayed ? userDetails?.classList.remove("hide") : userDetails?.classList.toggle('hide')
        }
    }
    return (
        <>
            
        <div className="toggle-acess">
            <div className="toggle-main">
                <button onClick={showToggleOpts} className='toggle-btn'>
                    <ImAccessibility size={30} />
                </button>
            </div>
            <div className="toggle-group hideShow">
                <div className="toggle-opts">
                    <button className='toggle-opt-btn'>
                    <TbArrowBigTop />
                    </button>
                </div>
                <div className="toggle-opts">
                    <button className='toggle-opt-btn'>
                    <TbArrowBigDown />
                    </button>
                </div>
                <div className="toggle-opts">
                    {theme === 'light' ?
                    (<button onClick={() => setTheme("dark")} className='toggle-opt-btn'>
                        <ImContrast />
                    </button>)
                    :
                    (<button onClick={() => setTheme("light")} className='toggle-opt-btn'>
                        <ImContrast />
                    </button>)}
                </div>
            </div>
        </div>
            <div className="header-side show-sidebar">
                <button className="toggleSidebar" onClick={openTeste}>
                    <RiMenuFill size={30} />
                </button>
                <div className="sidebar-logo">
                    <img src={brandLogo} alt="" />
                </div>
                <Sidebar />
            </div>
            <div className="header-top-barra">
                <div className="home-barra-acess-props hide-header">
                    <ul>
                        <li>
                            <span id='aumentaFonte'>Aumentar Fonte</span>
                        </li>
                        <li>
                            <span id='diminuiFonte'>Diminuir Fonte</span>
                        </li>
                        <li>
                            {theme === 'light' ?
                                (<span onClick={() => setTheme("dark")} className="cursor-pointer"> Sem Contraste</span>)
                                :
                                (<span onClick={() => setTheme("light")} className="cursor-pointer">  Alto Contraste</span>)
                            }
                        </li>
                        {/* <li>
                    <span>Modo Escuro</span>
                    </li> */}
                    </ul>
                </div>
                <div className="home-barra-client-items">
                    <ul>
                        <li>
                            <img src={carrinhoIcon} alt="Carrinho" />
                            Carrinho
                        </li>
                        <li>
                            <img src={suporteIcon} alt="Suporte" />
                            Suporte
                        </li>
                        <li>
                            <div onClick={editarInfoConta} className="flex gap-2">
                                <MostrarImagemPerfil />
                                { user ? user.nome : <Link to="/login">Entrar</Link> }
                            </div> 
                            <div className="user-options-home hide">
                                <ul>
                                    <li onClick={()=>{
                                        window.location.href=`/atualizar-cliente/${user._id}`
                                    }}>Editar Perfil</li>
                                    <li onClick={()=>{
                                        window.localStorage.removeItem("user");
                                        window.location.href="/"
                                    }}>Sair</li>
                                </ul>
                            </div>  
                        </li>
                        
                    </ul>
                </div>
            </div>
            <div className="search-container">
                <div className="menu-toggle">
                    <button onClick={openTeste}>
                        <RiMenuFill />
                    </button>
                </div>
                <div className="searchbar-contaienr">
                    <input type="text" placeholder='O que você busca?' />
                    <button className="search-btn"><BiSearch /></button>
                </div>
                <div className="hide-header">
                    <ul className="menu-items">
                        {arrayNavItems.map((el: any) => {
                            return (
                                <li className="menu-item">
                                    <a href={el.path} className='menu-item-btn'>
                                        {el.title}
                                    </a>
                                </li>
                            )
                        })}
                        
                    </ul>
                </div>
            </div>
            <div className="header-desc">
                <div className="header-txt">
                    <span className='txt-light'>o melhor dos</span>
                    <span className='txt-bold'>artigos esportivos</span>
                    <span className='txt-light'>para <span className='underline'>você.</span></span>
                </div>
                <div className="header-brand-container">
                    <img src={brandLogo} alt="Full Sports" />
                </div>
            </div>
            <div className="video-header">
                <div className="header-transparent-cover"></div>
                <video autoPlay loop muted disablePictureInPicture controlsList='nodownload'>
                    <source src={headerVideo} type="video/mp4" />
                </video>
            </div>

        </>
    )
}

export default HomeHeader