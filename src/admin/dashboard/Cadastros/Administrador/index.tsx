import React, { useState } from "react";

import styled from 'styled-components';
import './styles.css';
import { Button, TextField, FormControl, Select, InputLabel, MenuItem, Box } from "@mui/material";
import apiFullSports from "../../../../api/apiFullSports";
import ApiCep from "../../../../api/apiCep";
const Main = styled.main`
    width: 100%;
    min-height: 600px;
`;
const ExibeTitulo = styled.h3`
    margin: 2%;
    text-align: center;
`;
const FormCadastroCliente = styled.div`
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
    }
  
`;
const BttCadClienteGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-auto-rows: minmax(auto, auto);
    grid-gap: 2px;
`;

const CadastroAdministrador = () => {

    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const dataAtual = new Date().toLocaleDateString();
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

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [isAdmin] = useState(true);

    const [idImagem, setIdImagem] = useState('');
    const [idLogin, setIdLogin] = useState('');

    const [mensagemErroBolean, setMensagemErroBolean] = useState(false);
    const [ menssagemErro, setMenssagemErro] = useState('')
    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }

    function buscaCep() {
        console.log(cep)
        ApiCep.request({
            method: 'GET',
            url: cep,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
        }).then(evento => {
            setRua(evento.data.street);
            setBairro(evento.data.neighborhood);
            setEstado(evento.data.state);
            setCidade(evento.data.city)
        }).catch(err=>{
            alert("cep invalido");
            console.log(err)
        })
    }

    function aoSubmeterForm(event: React.FormEvent<HTMLFormElement>){
        setSpinner(true);
        event.preventDefault();
        console.log(email, password)
        apiFullSports.request({
            method: "POST",
            url: 'login/',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: {
                email: email,
                password: password,
                isAdmin: true
            }
        }).then(respostaLogin => {
            if(respostaLogin.data.message){
                setSpinner(false)
                setMensagemErroBolean(true);
                setMenssagemErro(respostaLogin.data.message);
            }else{
                console.log(respostaLogin.data._id)
                setIdLogin(respostaLogin.data._id)
                const formData = new FormData();  
                if (file) {
                    formData.append("file", file);
                    apiFullSports.request({
                        method: "POST", 
                        url: "imagem/",
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'multipart/form-data'
                        },
                        data: formData
                    })
                    .then(respostaImagem =>{
                      apiFullSports.request({
                        method: "POST",
                        url: "cadastrar-cliente/",
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        },
                        data: {
                            cpf: cpf,
                            nome: nome, 
                            login: respostaLogin.data._id,
                            dataNascimento: dataNascimento,
                            sexo: sexo,
                            cep: cep,
                            endereco: `${rua},${numero} -${complemento}- ${estado}, ${cidade}, ${bairro}`,
                            dataCadastro: dataAtual,
                            imagemPerfil: respostaImagem.data._id
                        }
                      }).then(()=> setSpinner(false)).catch(err =>{console.log(err)})
                    }).catch(err =>{console.log(err)})
                }else{
                    apiFullSports.request({
                        method: "POST",
                        url: "cadastrar-cliente/",
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        },
                        data: {
                            cpf: cpf,
                            nome: nome, 
                            login: respostaLogin.data._id,
                            dataNascimento: dataNascimento,
                            sexo: sexo,
                            cep: cep,
                            endereco: `${rua},${numero} -${complemento}- ${estado}, ${cidade}, ${bairro}`,
                            dataCadastro: dataAtual
                        }
                      }).then(()=> setSpinner(false)).catch(err =>{console.log(err)})
                }
            }
            }).catch(err=>{console.log(err)})

    }

    return (
        <>
        <Main id="main">
        <ExibeTitulo id="exibe-titulo" className="exibe-titulo">Cadastrar um Adimin</ExibeTitulo>
            <FormCadastroCliente id="form-cadastro-cliente" className="form-cadastro-cliente">
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
                            />

                        <label className="col-form-label">E-mail</label>
                            <TextField
                                sx={{ boxSizing: 'border-box', margin: '0 0 15px', width: '100%' }}
                                onChange={evento => setEmail(evento.target.value)}
                                onClick={()=> setMensagemErroBolean(false)}
                                className="txt-form"
                                label="email"
                                id="email"
                                type="email"
                                placeholder={'Insira seu e-mail'}
                                fullWidth
                                required
                            />

                            <label className="col-form-label">Senha</label>
                                <TextField
                                    sx={{ boxSizing: 'border-box', margin: '0 0 15px', width: '100%' }}
                                    onChange={evento => setPassword(evento.target.value)}
                                    className="txt-form"
                                    label="password"
                                    id="password"
                                    type="password"
                                    placeholder={'Insira sua senha'}
                                    fullWidth
                                    required
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

                            <label className="col-form-label">Cep</label>
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
                            <label className="col-form-label">Imagem de Perfil</label>
                            <input
                                onChange={selecionarArquivo}
                                className="txt-form"
                                id="imagemPerfil"
                                type="file"
                                name="file"
                                accept="image/jpeg, image/pjpeg, image/png, image/gif"
                            />
                            {spinner && (<p>carregando...</p>)}
                            {mensagemErroBolean && (<span id="menssagem-erro">{menssagemErro}</span>)}
                        </Row1grid>

                        <BttCadClienteGrid id="btt-cad-cliente-grid" className="btt-cad-cliente-grid">
                            <Button
                                sx={{
                                    justifyContent: 'center', display: 'block', height: '50px', borderRadius: '5px', color: '#fff',
                                    fontSize: '14px', backgroundColor: 'black', ":hover": 'backgroundColor: #313131, transform:translate(0.8s)'
                                }}
                                type="submit" id="btn-cad-forms" className="btn-cad-forms">
                                Cadastrar Cliente
                            </Button>
                            <Button
                                onClick={evento => window.location.href = '/dashboard/consulta-admin'}
                                sx={{
                                    justifyContent: 'center', display: 'block', height: '50px', borderRadius: '5px', color: '#fff',
                                    fontSize: '14px', backgroundColor: 'black', ":hover": 'backgroundColor: #313131, transform:translate(0.8s)'
                                }} type="button" id="btn-cad-forms" className="btn-cad-forms">
                                Consulta de Adiministradores
                            </Button>
                        </BttCadClienteGrid>
                    </Box>
            </FormCadastroCliente>
            </Main>
        </>
    )
}

export default CadastroAdministrador;