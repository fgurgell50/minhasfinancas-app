import React from "react";
import AuthService from "../app/service/authService";

export const AuthContext = React.createContext()
//esse é o componente Pai 
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = AuthContext.Provider;

class ProvedorAutenticaco extends React.Component{

state = {
    usuarioAutenticado: null,
    isAutenticado: false
}

iniciarSessao = (usuario) => {
    AuthService.logar(usuario)
    this.setState({ isAutenticado: true, usuarioAutenticado: usuario } )
    
}

encerrarSessao = () => {
    AuthService.removerUsuarioAutenticado()
    this.setState({ isAutenticado: false, usuarioAutenticado: null })

}

    render(){
        const contexto = {
            //definir quais os metodos que serão passdos para os filhos
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return(
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        )
    }
}
export default ProvedorAutenticaco