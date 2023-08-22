import React from "react";
import UsuarioService from "../app/service/usuarioService";
import { AuthContext } from '../main/provedorAutenticacao'


class Home extends React.Component{

    state = {
        saldo: 0
    }

    constructor(){
        super()
        this.usuarioService = new UsuarioService();
    }

    componentDidMount(){
        //const usuarioLogado = LocalStorageService.obterItem( '_usuario_logado' )
        console.error('Contexto', this.context)
        const usuarioLogado = this.context.usuarioAutenticado
        //console.error('Usuario Logado 2', usuarioLogado2)
        console.error('Usuario Logado', usuarioLogado)
        console.error('ID Usuario Logado', usuarioLogado.id)

        this.usuarioService
        .obterSaldoPoUsuario(usuarioLogado.id)
        .then( response => {
        this.setState({ saldo: response.data })
         }).catch( erro => {
            console.error(erro.response)
            //this.setState({mensagemErro: erro.response.data})
         })
    } 

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

Home.contextType = AuthContext;

export default Home