import React from "react"

import Card from '../components/card'
import FormGroup from "../components/form-group"
import { withRouter } from 'react-router-dom'
//import axios from "axios" foi retirado por causa do UsuarioService
import UsuarioService from "../app/service/usuarioService"
import LocalStorageService from "../app/service/localStorageService"
import { mensagemErro } from '../components/toastr'

class Login extends React.Component{

    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }

    constructor(){
        super()
        this.service = new UsuarioService();
    }

    entrar =  () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            //localStorage.setItem('_usuario_logado', JSON.stringify(response.data))
            LocalStorageService.adicionarItem( '_usuario_logado', response.data )
            this.props.history.push('/home')
         }).catch( erro => {
            console.log('entrou no erro')
            //this.setState({mensagemErro: erro.response.data})
            mensagemErro(erro.response.data)
         })
    }

   /* entrar = async () => {
        // console.log('Email: ', this.state.email)
         //console.log('Senha: ', this.state.senha)
         try{
             const response = await axios
             .post('http://localhost:8080/api/usuarios/autenticar',{
                 email: this.state.email,
                 senha: this.state.senha
             }
             //).then( response => {
             //  this.props.history.push('/home')
             //}).catch( erro => {
             // console.log('entrou no erro')
                 //this.setState({mensagemErro: erro.response.data})
             //})
             )
             console.log('resposta:', response)
             console.log('requisição encerrada')
 
         }catch(erro){
             console.log(erro.response)
         }
     }*/





    prepareCadastar = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    render(){
        return(
                <div className="row">
                    <div className="col-md-6" style={ {position: 'relative', left:'300px' } }>
                        <div className="bs-docs-section">
                            <Card title="Login">
                                 <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                    <input type="email" 
                                                    value={this.state.email}
                                                    onChange={e => this.setState({email: e.target.value})}
                                                    className="form-control" 
                                                    id="exampleInputEmail1" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Digite o Email" />
                                                </FormGroup>
                                                <FormGroup label="Semha: *" htmlFor="exampleInputPassword1">
                                                <input type="password" 
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({senha: e.target.value})}
                                                    className="form-control" 
                                                    id="exampleInputPassword1" 
                                                     placeholder="Password" />
                                                </FormGroup>
                                                <button onClick={this.entrar} type="button" className="btn btn-success">Entrar</button>
                                                <button onClick={this.prepareCadastar} type="button" className="btn btn-danger">Cadastrar</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            )
         }
    }       

export default withRouter( Login ) 