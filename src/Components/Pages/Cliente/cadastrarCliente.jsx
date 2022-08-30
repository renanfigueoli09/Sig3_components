import React from "react";
import styled from "styled-components";
import Footer from "./../../Footer/index";
import Cabecalho from "./../../Cabecalho/index";
import FormsCliente from "../../Forms/formsCliente";
const Main = styled.main`
    width: 100%;
    min-height: 600px;
`;
const ExibeTitulo = styled.h3`
    margin: 2%;
    text-align: center;
`;

const CadastrarCliente = () =>{
return(
    <>
    <Cabecalho />
    <Main>
        <ExibeTitulo id="exibe-titulo" className="exibe-titulo">Cadastrar Cliente</ExibeTitulo>
        <FormsCliente />
    </Main>
    <Footer />
    </>
);
}
export default CadastrarCliente;
