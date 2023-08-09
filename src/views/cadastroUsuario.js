import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'

import UsuarioService from '../app/service/usuarioService'
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroUsuario extends React.Component{

    state = {
        nome : '',
        email: '', 
        senha: '',
        senhaRepeticao : ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    validar(){
        const msgs = []

        if(!this.state.nome){
            msgs.push('O campo nome é obrigatório')
        }

        if(!this.state.email){
            msgs.push('O campo email é obrigatório')
            // regex /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/
        }else if( ! this.state.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ){
            msgs.push('Informe um email válido')
        }

        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha 2x')
        }else if( this.state.senha !== this.state.senhaRepeticao ){
            msgs.push('As senhas não batem')
        }
        return msgs;
    }


    cadastrar = () => {
        const msgs = this.validar()
        //Array = [1,2,3] posição 0,1,2
        if( msgs && msgs.length > 0 ){ 
            msgs.forEach( (msg, index) => {
                mensagemErro(msg)

            })
            return false
        }

        //const {nome, email, senha, senhaRepeticao } = this.state        
        //const usuario = {nome,  email, senha, senhaRepeticao }
        const usuario = {
            nome : this.state.nome,
            email: this.state.email, 
            senha: this.state.senha
        }
        /*
        try{
            this.service.validar(usuario);
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg));
            return false;
        }
        */
        
        
        this.service.salvar(usuario)
            .then( response => {
                mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
            
            /*
            this.service.salvar(usuario)
            .then(response => {
                console.log('Entrou' + response.status)
                console.log("Status" + response.data)
                
                if (response.status == 200 || response.status == 201){
                    console.log('Entrou no Status 200' + response.status)
                    mensagemSucesso('Usuário cadastrado com sucesso!')
                     this.props.history.push('/login')
                }else {
                    console.log(response.status)
                    mensagemErro('Ocorreu um erro durante o cadastro do usuário.');
                }
            })     
            */   
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render(){
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" 
                                       id="inputNome" 
                                       className="form-control"
                                       name="nome"
                                       onChange={e => this.setState({nome: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email" 
                                       id="inputEmail"
                                       className="form-control"
                                       name="email"
                                       onChange={e => this.setState({email: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" 
                                       id="inputSenha"
                                       className="form-control"
                                       name="senha"
                                       onChange={e => this.setState({senha: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password" 
                                       id="inputRepitaSenha"
                                       className="form-control"
                                       name="senha"
                                       onChange={e => this.setState({senhaRepeticao: e.target.value})} />
                            </FormGroup>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">
                                <i className="pi pi-save"></i> Salvar
                            </button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">
                                <i className="pi pi-times"></i> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)