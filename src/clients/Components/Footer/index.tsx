import { BiSend } from 'react-icons/bi'
import { arrayNavItems } from '../../../utils/NavItems';
import { DevNames } from '../../../utils/devNames';
import { AiFillTwitterCircle, AiOutlineInstagram, AiFillFacebook } from 'react-icons/ai';
import '../../../../src/styles.css';
import './styles.css';
import { useState,useEffect } from 'react';
import apiFullSports from '../../../api/apiFullSports';
const brandLogo = require('../../../assets/images/fullSportLogo.png');
const Footer = () => {
    const [email, setEmail] = useState('');
    const [isLogin,setIsLogin] = useState(true);
    const user = JSON.parse(localStorage.getItem('user') as string);
    useEffect(()=>{
        if(user){
            setIsLogin(false)
        }else{
            setIsLogin(true)
        }
    },[])
    function pesquisaEmail(evento: React.FormEvent<HTMLFormElement>){
        evento.preventDefault();
        apiFullSports.post('pesquisar-email/', { email: email }).then(reposta => {
            if (reposta.data.emailExiste) {
                localStorage.setItem('email', JSON.stringify(email));
                window.location.href = "/login";
            } else{
                localStorage.setItem('email', JSON.stringify(email));
                window.location.href = "/cadastrar-cliente";
            }
        })
    }
    return (
        <div className="footer-container">

            {isLogin && (<div className="footer-news-sub">
                <div className="news-sub-desc">
                    <span className="news-sub-title">Quer ficar por dentro das novidades?</span>
                    <span className="news-sub-subt">Assine nossa newsletter e continue atualizado sobre nossos lançamentos.</span>
                </div>
                <div className="input-container">
                    <form action="" method="post"   onSubmit={pesquisaEmail}>
                        <input placeholder="Insira seu e-mail" type="email" onChange={evento => setEmail(evento.target.value)} />
                        <button type="submit"  ><BiSend color={'#09080980'} /></button>
                    </form>
                </div>
            </div>)}

            <div className="footer-body">
                <div className="footer-left-group">
                    <div className="footer-item-group">
                        <h6 className="footer-item-title">Navegação</h6>
                        <ul className="items-group">
                            {arrayNavItems.map((el: any) => {
                                return (
                                    <li className="footer-items">
                                        <a href={el.path} className="footer-link">
                                            {el.title}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="footer-item-group">
                        <h6 className="footer-item-title">Desenvolvedores</h6>
                        <ul className="items-group">
                            {DevNames.map((el: any) => {
                                return (
                                    <li className="footer-items">
                                        <a target="_blank" href={el.linkedin}>
                                            {el.name}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="footer-right-group">
                    <div className="brand-container">
                        <img src={brandLogo} alt="Full Sports" />
                    </div>
                    <div className="group-specs">
                        <span>O melhor dos artigos esportivos para você.</span>
                        <div className="group-socials">
                            <a href="https://twitter.com/">
                                <AiFillTwitterCircle />
                            </a>
                            <a href="https://www.instagram.com/">
                                <AiOutlineInstagram />
                            </a>
                            <a href="https://www.facebook.com/">
                                <AiFillFacebook />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom-line">
                Full Sports &copy; Todos os direitos reservados.
            </div>
        </div>
    );
}
export default Footer;