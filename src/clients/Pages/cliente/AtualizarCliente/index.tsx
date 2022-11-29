import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Button, TextField, FormControl, Select, InputLabel, MenuItem, Box, Modal } from "@mui/material";
import apiFullSports from "../../../../api/apiFullSports";
import ApiCep from "../../../../api/apiCep";
import { useParams } from "react-router-dom";
import ICliente from "../../../../utils/interfaces/ICliente";
import Cabecalho from "../../../Components/Menu/Header";
// import './styles.css'
const SinalMais = require('../../../../assets/icons/sinalMais.png')

const Main = styled.main`
    width: 100%;
    min-height: 600px;
`;
const ExibeTitulo = styled.div`
    margin: 2%;
    display: flex;
    justify-content: center;
    h3{
        
        margin-right: 2%;
        font-size: 25px;
    }
`;
const FormAtualizarCliente = styled.div`
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    margin-top: 20px;
    box-shadow: 1px 1px 8px rgb(70, 70, 70, 0.2);
    padding: 2%;
    width: 40%;
    height: auto;
    font-size: 12pt;
    border-radius: 10px;
    @media screen and (max-width: 1144px) {
        width: 90%;
        height: auto;
        font-size: 12px;
        border-radius: 10px;
    }
`;
const Row1grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-auto-rows: minmax(auto, auto);
    grid-gap: 5px;
    border-radius: 20px;
    width: auto;
    height: auto;
    margin: 1px;  
    .col-form-label{
        font-size: 20px;
    }
    #imagemPerfil{
        box-sizing: border-box;
        margin: 0 0 15px;
        width: 100%;
        padding: 15px;
        border-radius: 4px;
        border: 1px solid #aca5a5;

    }
    #menssagem-erro{
    color: #a23b3b;
    font-size: 20x;
    }
`;
const BttCadClienteGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-auto-rows: minmax(auto, auto);
    grid-gap: 2px;
    #btn-cad-forms{
        justify-content: center;
        display: block;
        height: 50px;
        border-radius: 5px;
        color: #fff;
        font-size: 14px;
        background-color: black;
        :hover{
            background-color: #313131;
            text-decoration: 0.90s;
        }
    }
`;
const Icone = styled.div`
    background-color: #a49898;
    height: 50px;
    width: 50px;
    cursor: pointer;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
        img{
        height: 50px;
        width: 50px;
        border-radius: 100px;
        }
        .sinal-mais-imagem{
            display: none;
        }
`;
const IconePage = styled.div`
    background-color: #a49898;
    height: 50px;
    width: 50px;
    cursor: pointer;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
        img{
        height: 50px;
        width: 50px;
        border-radius: 100px;
        }
        .sinal-mais-imagem{
            display: none;
        }
        :hover{
        .sinal-mais-imagem{
            display: inline;
            width: 50%;
            height: 50%;
        }
        .texto-imagem-pergil{
            display: none;
        }
        .foto-perfil-page{
            display: none;
        }
    }
`;
const AtualizarImagemLabel = styled.label`
cursor: pointer;
text-transform: uppercase;
color: #FFF;
border: solid 1px #ffffff;
margin-top: 4%;
margin-bottom: 4%;
display: flex;
padding: 10px 10px;
`;
const AtualizarCliente = () => {
    const parametros = useParams();
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [complemento, setComplemento] = useState('');
    const [numero, setNumero] = useState('');
    const [file, setImagem] = useState<File | null>(null)
    const [spinner, setSpinner] = useState(false);
    const [imagemId, setImagemID] = useState('');
    const [imagemPerfilurl, setImagemPerfilurl] = useState('')

    const [mensagemErroBolean] = useState(false);
    const [menssagemErro] = useState('')
    const [cadastrarNovaFoto, setCadastrarNovaFoto] = useState(false)
    const [carregandoCep, setCarregandoCep] = useState(false)
    const [carregandoCepMenssagem, setCarregandoCepMessagem] = useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (parametros.id) {
            apiFullSports.get<ICliente>(`listar-cliente/${parametros.id}`)
                .then(resposta => setCpf(resposta.data.cpf))
                .catch((err) => console.log(err));

            apiFullSports.get<ICliente>(`listar-cliente/${parametros.id}`)
                .then(resposta => setNome(resposta.data.nome))
                .catch((err) => console.log(err));

            apiFullSports.get<ICliente>(`listar-cliente/${parametros.id}`)
                .then(resposta => setDataNascimento(resposta.data.dataNascimento))
                .catch((err) => console.log(err));

            apiFullSports.get<ICliente>(`listar-cliente/${parametros.id}`)
                .then(resposta => setSexo(resposta.data.sexo))
                .catch((err) => console.log(err));

            apiFullSports.get<ICliente>(`listar-cliente/${parametros.id}`)
                .then(resposta => setCep(resposta.data.cep))
                .catch((err) => console.log(err));

            apiFullSports.get<ICliente>(`listar-cliente/${parametros.id}`)
                .then(resposta => {

                    if (resposta.data.imagemPerfil === null || resposta.data.imagemPerfil === undefined) {
                        setImagemID('')
                        setImagemPerfilurl('')
                    } else {
                        setImagemID(resposta.data.imagemPerfil._id)
                        setImagemPerfilurl(resposta.data.imagemPerfil.url)
                    }

                })

                .catch((err) => console.log(err));
        }

    }, [parametros]);

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0]);
            setCadastrarNovaFoto(true)
        } else {
            setImagem(null)
        }

    }
    console.log(file)

    function cadastrarFotoPerfil() {
        if (imagemId === '') {
            const formData1 = new FormData()
            if (file) {
                formData1.append('file', file)
            }
            setSpinner(true)
            apiFullSports.request({
                url: 'imagem/',
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'multipart/form-data'
                },
                data: formData1
            }).then(evento => {
                apiFullSports.request({
                    url: `imagem/${evento.data._id}`,
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                }).then(respostaImagem => {
                    apiFullSports.request({
                        url: `atualizar-cliente/${parametros.id}`,
                        method: 'PUT',
                        data: {
                            imagemPerfil: respostaImagem.data._id
                        }
                    })
                }).then(() => {
                    setSpinner(false)
                    setCadastrarNovaFoto(false)
                    window.location.reload()
                }).catch(erro => console.log(erro))

                // handleClose()
            }).catch(erro => console.log(erro))
        }
        else {
            apiFullSports.delete(`imagem/${imagemId}`)
            setSpinner(true)
            setImagemID('');

            const formData1 = new FormData()
            if (file) {
                formData1.append('file', file)
            }
            apiFullSports.request({
                url: "imagem/",
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'multipart/form-data'
                },
                data: formData1
            }).then(evento => {
                apiFullSports.request({
                    method: "PUT",
                    url: `atualizar-cliente/${parametros.id}`,
                    data: {
                        imagemPerfil: evento.data._id
                    }
                }).then((response) => {
                    // setSpinner(false);
                    // setCadastrarNovaFoto(false);
                    // setImagemID(response.data.imagemPerfil._id);
                    // setImagemPerfilurl(response.data.imagemPerfil.url);
                   
                    window.location.reload();
                }).catch(erro => console.log(erro))

                // handleClose()
            }).catch(erro => console.log(erro))
        }
    }

    const deletarFoto = () => {
        apiFullSports.delete(`imagem/${imagemId}`)
        setImagemID('');
        window.location.reload();
    }
    function buscaCep() {
        setCarregandoCep(true)
        setCarregandoCepMessagem(false)
        console.log(cep)
        if(cep===''){
            setCarregandoCep(false)
            setRua('');
            setBairro('');
            setEstado('');
            setCidade('')
        }else{
        ApiCep.request({
            method: 'GET',
            url: cep,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
        }).then(evento => {
            setCarregandoCep(false)
            setRua(evento.data.street);
            setBairro(evento.data.neighborhood);
            setEstado(evento.data.state);
            setCidade(evento.data.city)
        }).catch(err => {
            setCarregandoCep(false)
            setCarregandoCepMessagem(true)
            console.log(err)
        })
    }
    }
    function buscaCepCarregarPage() {
        console.log(cep)
        ApiCep.request({
            method: 'GET',
            url: cep,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        }).then(evento => {
            setRua(evento.data.street);
            setBairro(evento.data.neighborhood);
            setEstado(evento.data.state);
            setCidade(evento.data.city)
        })
    }
    setTimeout(buscaCepCarregarPage, 222)

    const IconePerfil = () => {
        if (imagemId === '') {
            return (
                <Icone className="icone" onClick={handleOpen}>
                    <p className="texto-imagem-pergil">{nome.charAt(0)}</p>

                </Icone>
            )
        } else {
            return (
                <Icone className="icone" onClick={handleOpen}>
                    <img src={imagemPerfilurl} alt="imagem de perfil" />
                </Icone>
            )
        }
    }
    const IconePerfilPage = () => {
        if (imagemId === '') {
            return (
                <IconePage className="icone" onClick={handleOpen}>
                    <p className="texto-imagem-pergil">{nome.charAt(0)}</p>
                    <img src={SinalMais} className="sinal-mais-imagem" alt="imagem de sinal de mais" />
                </IconePage>
            )
        } else {
            return (
                <IconePage className="icone" onClick={handleOpen}>
                    <img src={imagemPerfilurl} className="foto-perfil-page" alt="imagem de perfil" />
                    <img src={SinalMais} className="sinal-mais-imagem" alt="imagem de sinal de mais" />
                </IconePage>
            )
        }
    }

    const OpcoesFotoPerfil = () => {
        if (imagemId === '' || imagemPerfilurl === '') {

            return (
                <Box component={"div"} sx={{ marginTop: '5.5%', marginRight: '3%' }}>
                    <Box component={"div"} sx={{ display: 'flex', justifyContent: "center", paddingBottom: "1%" }}>
                        <IconePerfil />
                    </Box>
                    <Box component={"div"} sx={{ display: 'grid' }} id="tela-imagem-opcoes">
                        <div>
                            <AtualizarImagemLabel htmlFor="file" >Escolher foto...</AtualizarImagemLabel>
                            <input
                                onChange={selecionarArquivo}
                                className="txt-form"
                                id="file"
                                type="file"
                                name="file"
                                accept="image/jpeg, image/pjpeg, image/png, image/gif"
                            />
                        </div>
                        {cadastrarNovaFoto && (<Button variant="outlined" sx={{ border: "2px solid" }} onClick={cadastrarFotoPerfil}>Cadastrar Nova Foto</Button>)}
                        <Button variant="outlined" sx={{ border: "2px solid" }} onClick={handleClose}>Fechar</Button>
                    </Box>
                </Box>
            )
        } else {
            return (
                <Box component={"div"} sx={{ marginTop: '5.5%', marginRight: '3%' }}>
                    <Box component={"div"} sx={{ display: 'flex', justifyContent: "center", paddingBottom: "1%" }}>
                        <IconePerfil />
                    </Box>
                    <Box component={"div"} sx={{ display: 'grid' }} id="tela-imagem-opcoes">
                        <Button color="error" variant="outlined" sx={{ border: "2px solid alert" }} onClick={deletarFoto} >Excluir Foto</Button>
                        <div>
                            <AtualizarImagemLabel htmlFor="file" >Escolher foto...</AtualizarImagemLabel>
                            <input
                                onChange={selecionarArquivo}
                                className="txt-form"
                                id="file"
                                type="file"
                                name="file"
                                accept="image/jpeg, image/pjpeg, image/png, image/gif"
                            />
                        </div>
                        {cadastrarNovaFoto && (<Button variant="outlined" sx={{ border: "2px solid" }} onClick={cadastrarFotoPerfil}>Cadastrar Nova Foto</Button>)}
                        <Button variant="outlined" sx={{ border: "2px solid" }} onClick={handleClose}>Fechar</Button>
                    </Box>
                </Box>
            )
        }
    }

    function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        setSpinner(true);
        if (parametros.id) {
            apiFullSports.put(`atualizar-cliente/${parametros.id}`, {
                cpf: cpf,
                nome: nome,
                dataNascimento: dataNascimento,
                sexo: sexo,
                cep: cep,
                endereco: `${rua},${numero} -${complemento}- ${estado}, ${cidade}, ${bairro}`,
            }).then(() => {
                setSpinner(false)
                // alert("cliente atualizado com suceeso");
                window.location.href = "/dashboard/consultar-admin";
            }).catch(erro => console.log(erro))
        }
    }

    return (
        <>
            <Main id="main">
                <Cabecalho/>
                <ExibeTitulo id="exibe-titulo" className="exibe-titulo"><h3>Atualizar dados de {nome}</h3> <IconePerfilPage /></ExibeTitulo>
                <FormAtualizarCliente id="form-cadastro-cliente" className="form-cadastro-cliente">
                    <Box component={'form'} onSubmit={aoSubmeterForm} encType="multipart/form-data">
                        <Row1grid id="row-1-grid" className="row-1-grid">
                            <label className="col-form-label">CPF</label>
                            <TextField
                                sx={{ boxSizing: 'border-box', margin: '0 0 15px', width: '100%' }}
                                onChange={evento => setCpf(evento.target.value)}
                                className="txt-form"
                                label="cpf"
                                id="cpf"
                                type="text"
                                placeholder={'00.000.000-00'}
                                fullWidth
                                required
                                value={cpf}
                            />

                            <label className="col-form-label">Nome</label>
                            <TextField
                                sx={{ boxSizing: 'border-box', margin: '0 0 15px', width: '100%' }}
                                onChange={evento => setNome(evento.target.value)}
                                className="txt-form"
                                label="Nome"
                                id="nome"
                                type="text"
                                placeholder={'Digite seu nome'}
                                fullWidth
                                required
                                value={nome}
                            />

                            <label className="col-form-label">Data de Nascimento</label>
                            <TextField
                                sx={{ boxSizing: 'border-box', margin: '0 0 15px', width: '100%' }}
                                onChange={evento => setDataNascimento(evento.target.value)}
                                className="txt-form"
                                label="Data de Nascimento"
                                id="data"
                                type="text"
                                placeholder={'__/__/____'}
                                fullWidth
                                required
                                value={dataNascimento}
                            />

                            <label className="col-form-label">Sexo</label>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="sexo">Sexo</InputLabel>
                                <Select className="txt-form" labelId="sexo" sx={{ boxSizing: 'border-box', margin: '0 0 15px', width: '100%' }}
                                    value={sexo} onChange={evento => setSexo(evento.target.value)} required>
                                    <MenuItem key={''} value={''}></MenuItem>
                                    <MenuItem key={'M'} value={'M'}>Masculino</MenuItem>
                                    <MenuItem key={'F'} value={'F'}>Feminino</MenuItem>
                                    <MenuItem key={'O'} value={'O'}>Outros</MenuItem>
                                    <MenuItem key={'-'} value={'-'}>Prefiro não dizer</MenuItem>
                                </Select>
                            </FormControl>

                            <label className="col-form-label">Cep {carregandoCep && <p>buscando cep...</p>}{carregandoCepMenssagem && <p id="menssagem-erro">cep invalido</p>}</label>
                            <TextField
                                onChange={evento => setCep(evento.target.value)}
                                sx={{ boxSizing: 'border-box', margin: '0 0 15px', width: '100%' }}
                                className="txt-form"
                                label="Cep"
                                id="cep"
                                type="text"
                                placeholder={'00000-000'}
                                fullWidth
                                required
                                onBlur={buscaCep}
                                value={cep}
                            />

                            <label className="col-form-label">Rua</label>
                            <TextField
                                onChange={evento => setRua(evento.target.value)}
                                sx={{ boxSizing: 'border-box', margin: '0 0 15px', width: '100%' }}
                                className="txt-form"
                                label="Rua"
                                id="rua"
                                type="text"
                                placeholder={'Digite sua rua'}
                                fullWidth
                                required
                                value={rua}
                            />

                            <label className="col-form-label">Bairro</label>
                            <TextField
                                onChange={evento => setBairro(evento.target.value)}
                                sx={{ boxSizing: 'border-box', margin: '0 0 15px', width: '100%' }}
                                className="txt-form"
                                label="Bairro"
                                id="bairro"
                                type="text"
                                placeholder={'Digite seu Bairro'}
                                fullWidth
                                required
                                value={bairro}
                            />

                            <label className="col-form-label">Estado</label>
                            <TextField
                                onChange={evento => setEstado(evento.target.value)}
                                sx={{ boxSizing: 'border-box', margin: '0 0 15px', width: '100%' }}
                                className="txt-form"
                                label="Estado"
                                id="estado"
                                type="text"
                                placeholder={'Digite seu estado'}
                                fullWidth
                                required
                                value={estado}
                            />

                            <label className="col-form-label">Cidade</label>
                            <TextField
                                onChange={evento => setCidade(evento.target.value)}
                                sx={{ boxSizing: 'border-box', margin: '0 0 15px', width: '100%' }}
                                className="txt-form"
                                label="Cidade"
                                id="cidade"
                                type="text"
                                placeholder={'Digite sua Cidade'}
                                fullWidth
                                required
                                value={cidade}
                            />
                            <label className="col-form-label">Número</label>
                            <TextField
                                onChange={evento => setNumero(evento.target.value)}
                                sx={{ boxSizing: 'border-box', margin: '0 0 15px', width: '100%' }}
                                className="txt-form"
                                label="Nº"
                                id="numero"
                                type="number"
                                fullWidth
                                required
                            />

                            <label className="col-form-label">Complemento</label>
                            <TextField
                                onChange={evento => setComplemento(evento.target.value)}
                                sx={{ boxSizing: 'border-box', margin: '0 0 15px', width: '100%' }}
                                className="txt-form"
                                label="Complemento"
                                id="complemento"
                                type="text"
                                placeholder={'casa/apartamento'}
                                fullWidth
                                required
                            />

                            {spinner && (<p>carregando...</p>)}
                            {mensagemErroBolean && (<span id="menssagem-erro">{menssagemErro}</span>)}
                        </Row1grid>

                        <BttCadClienteGrid id="btt-cad-cliente-grid" className="btt-cad-cliente-grid">
                            <Button type="submit" id="btn-cad-forms" className="btn-cad-forms">
                                Atualizar Dados
                            </Button>
                        </BttCadClienteGrid>
                    </Box>
                </FormAtualizarCliente>
            </Main>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                id="model"
            >
                <Box component={'div'} id="tela-imagem" className="tela-imagem" sx={{
                    width: '30%', height: '35%',
                    position: 'absolute' as 'absolute', top: '30%', left: '35%', display: 'flex', justifyContent: 'center',
                    backgroundColor: '#4e4a4a', border: '3px solid #000', borderRadius: '20px', pt: 2, px: 4, pb: 3
                }}>
                    <OpcoesFotoPerfil />
                    <Box component={'div'} >
                        {spinner && (<p>carregando...</p>)}
                    </Box>
                </Box>

            </Modal>
        </>
    )
};
export default AtualizarCliente;