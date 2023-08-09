import React from "react";
import axios from "axios";
import UsuarioService from "../app/service/usuarioService";
import LocalStorageService from "../app/service/localStorageService";

class Home extends React.Component{

    state = {
        saldo: 0
    }

    constructor(){
        super()
        this.usuarioService = new UsuarioService();
    }

    componentDidMount(){
        //const usuarioLogadoString = localStorage.getItem('_usuario_logado')
        //const usuarioLogado = JSON.parse(usuarioLogadoString)

        const usuarioLogado = LocalStorageService.obterItem( '_usuario_logado' )
        console.log('Usuario Logado no Local Storage:', usuarioLogado)

        
        //axios.get('http://localhost:8080/api/usuarios/2/saldo')
        // `http://localhost:8080/api/usuarios/${usuarioLogado.id}/saldo`
        // colocado dentro de crase e não apas simples para poder passar o parametro dentro
        //axios.get(`http://localhost:8080/api/usuarios/${usuarioLogado.id}/saldo`) essa que estava funcionando
        this.usuarioService
        .obterSaldoPoUsuario(usuarioLogado.id)
        .then( response => {
        this.setState({ saldo: response.data })
         }).catch( erro => {
            console.error(erro.response)
            //this.setState({mensagemErro: erro.response.data})
         })
    } 

    /*
    componentDidMount(){
        const usuarioLogadoString = localStorage.getItem('_usuario_logado')
        const usuarioLogado = JSON.parse(usuarioLogadoString)
        console.log('Usuario Logado no Local Storage:', usuarioLogado)

        axios.get(`http://localhost:8080/api/usuarios/${usuarioLogado.id}/saldo`)
        //axios.get('http://localhost:8080/api/usuarios/${usuarioLogado.id}/saldo')
        // `http://localhost:8080/api/usuarios/${usuarioLogado.id}/saldo`
        // colocado dentro de crase e não apas simples para poder passar o parametro dentro
        .then( response => {
        this.setState({ saldo: response.data })
         }).catch( erro => {
            console.error(erro.response)
            //this.setState({mensagemErro: erro.response.data})
         })
    } 
    código funcinando*/




    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" 
                        href="#/cadastro-usuarios" 
                        role="button"><i className="fa fa-users"></i>  
                        Cadastrar Usuário
                    </a>
                    <a className="btn btn-danger btn-lg" 
                        href="#/cadastro-lancamentos" 
                        role="button"><i className="fa fa-users"></i>  
                        Cadastrar Lançamento
                    </a>
                </p>
            </div>
        )
    }
}
export default Home