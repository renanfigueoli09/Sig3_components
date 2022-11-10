import React, { useEffect, useState } from "react";
import ICliente from "../../../../utils/interfaces/ICliente";
import apiFullSports from "../../../../api/apiFullSports";
import styled from "styled-components";
import { Box, Button, Modal } from "@mui/material";
import "./styles.css"
const BtnExibeGroup = styled.div``;
const BtnExibe = styled.button``;

const TabelaAdimistrador = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const [spinner, setSpinner] = useState(false);   
    const [clientes, setClientes] = useState<ICliente[]>([]);
    useEffect(() => {
        setSpinner(true);
        apiFullSports.get<ICliente[]>('listar-clientes/')
            .then(resposta => {setSpinner(false); setClientes(resposta.data) })
            .catch((err) => console.log(err));
    }, []);

    const deletar = (DeletarCliente: ICliente) => {
        apiFullSports.delete(`deletar-cliente/${DeletarCliente._id}/`);
        window.location.reload();
    }

       return <>
       {spinner && (<p>carregando...</p>)}
       {
        
        clientes.map(item => {
            if (item.imagemPerfil == null || item.imagemPerfil == undefined) {
                return (
                    <tr key={item._id.toString()}>

                        <th>
                       <div className="icone">
                        <p className="text-black">{item.nome.charAt(0)}</p>
                       </div>
                        </th>

                        <th>{`${item.dataCadastro.toLocaleString()}`}</th>
                        <th>{item.cpf}</th>
                        <th>{item.nome}</th>
                        <th>{item.dataNascimento}</th>
                        <th>{item.sexo}</th>
                        <th>{item.cep}</th>
                        <th>{item.endereco}</th>
                        {/* <td>
                            <BtnExibeGroup id="btn-exibe-group" className="btn-exibe-group">
                                <a href={`/sig/atualizar-cliente/${item._id}`} >
                                    <BtnExibe id="btn-exibe" className="btn-exibe"> Editar </BtnExibe></a>

                                <React.Fragment>
                                    <BtnExibe id="btn-exibe" className="btn-exibe" onClick={handleOpen}>Excluir</BtnExibe>
                                    <Modal
                                        hideBackdrop
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="child-modal-title"
                                        aria-describedby="child-modal-description"
                                    >
                                        <Box id="menssageAlert">
                                            <h2 id="child-modal-title">Deseja mesmo excluir o cliente {item.nome} ?</h2>
                                            <Button onClick={() => deletar(item)} variant="outlined" color="error" >Excluir</Button>
                                            <Button onClick={handleClose} variant="outlined" >Cancelar</Button>
                                        </Box>
                                    </Modal>
                                </React.Fragment>
                            </BtnExibeGroup>
                        </td> */}
                    </tr>
                )
            } else {
                return (
                    <>
                    <tr key={item._id.toString()}>

                        <th><img src={item.imagemPerfil.url} alt="imagem de perfil" /></th>
                        <th>{`${item.dataCadastro.toLocaleString()}`}</th>
                        <th>{item.cpf}</th>
                        <th>{item.nome}</th>
                        <th>{item.dataNascimento}</th>
                        <th>{item.sexo}</th>
                        <th>{item.cep}</th>
                        <th>{item.endereco}</th>
                        {/* <td>
                            <BtnExibeGroup id="btn-exibe-group" className="btn-exibe-group">
                                <a href={`/sig/atualizar-cliente/${item._id}`} >
                                    <BtnExibe id="btn-exibe" className="btn-exibe"> Editar </BtnExibe></a>

                                <React.Fragment>
                                    <BtnExibe id="btn-exibe" className="btn-exibe" onClick={handleOpen}>Excluir</BtnExibe>
                                    <Modal
                                        hideBackdrop
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="child-modal-title"
                                        aria-describedby="child-modal-description"
                                    >
                                        <Box id="menssageAlert">
                                            <h2 id="child-modal-title">Deseja mesmo excluir o cliente {item.nome} ?</h2>
                                            <Button onClick={() => deletar(item)} variant="outlined" color="error" >Excluir</Button>
                                            <Button onClick={handleClose} variant="outlined" >Cancelar</Button>
                                        </Box>
                                    </Modal>
                                </React.Fragment>
                            </BtnExibeGroup>
                        </td> */}
                    </tr>
                    </>
                )
            }
        })
    }
        </>

    
}
export default TabelaAdimistrador;
