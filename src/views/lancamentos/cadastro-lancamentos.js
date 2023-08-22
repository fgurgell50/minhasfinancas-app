import React from "react";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import currencyFormatter from 'currency-formatter'

import { withRouter } from "react-router-dom";

import LancamentoService from "../../app/service/lancamentoService";

import LocalStorageService from "../../app/service/localStorageService";

import selectMenu from "../../components/selectMenu";
import SelectMenu from "../../components/selectMenu";

import * as messages from '../../components/toastr'

class CadastroLancamentos extends React.Component{

    state = {
        id: null,
        descricao: '',
        //valor: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    componentDidMount(){
        //é executado depois do rebder
        const params = this.props.match.params
        console.log('params:',params)
       
        if(params.id){
                this.service.obterPorId(params.id)
                .then(response => { 
                    this.setState( {...response.data, atualizando:true} ) 
                 })
            .catch(erros => {
                messages.mensagemErro(erros.response.data)
            })
         }
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes, ano, tipo } = this.state;
        //const valorNumerico = parseFloat(valor.replace('R$', '').replace(/\s+/g, '').replace(',', '.'));
        //const valorNumerico = parseFloat(valor.replace('R$', ''));
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id };
        //qdo tem o memso nome não precisa passar decsricao: descricao, valor: valor

        try{
            this.service.validar(lancamento)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }     


        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
       
        const { descricao, valor, mes, ano, tipo, id, status, usuario } = this.state;
        //const valorNumerico = parseFloat(valor.replace('R$', '').replace(/\s+/g, '').replace(',', '.'));
        //const valorNumerico = parseFloat(valor.replace('R$', ''));
        const lancamento = { descricao, valor, mes, ano, tipo, status, id, usuario };
        //qdo tem o memso nome não precisa passar decsricao: descricao, valor: valor
        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento atualizado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name] : value })
    }


    render(){

       const  tipos = this.service.obterListaTipos();
       const  meses = this.service.obterListaMeses();
       //const  valor  = this.state;
       //const formattedValue = currencyFormatter.format(valor, { code: 'BRL' }); 
       // Formata o valor para o formato BRL (Real Brasileiro)
       const formattedValue = currencyFormatter.format(this.state.valor, { code: 'BRL' });


        return(
            <Card title = { this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançameto'}> 
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *" >
                            <input id="inputDescricao" type="text" 
                                   className="form-control" 
                                   name="descricao"
                                   value={this.state.descricao}
                                   onChange={this.handleChange}  />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" 
                                   type="text"
                                   name="ano"
                                   value={this.state.ano}
                                   onChange={this.handleChange} 
                                   className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" 
                                        lista={meses} 
                                        name="mes"
                                        value={this.state.mes}
                                        onChange={this.handleChange}
                                        className="form-control"/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                         <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" 
                                   type="text"
                                   name="valor"
                                   value={this.state.valor}
                                   /*value={formattedValue}*/
                                   onChange={this.handleChange} 
                                   className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                         <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" 
                                        lista={tipos} 
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChange}
                                        className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                         <FormGroup id="inputStatus" label="Status: ">
                            <input type="text" 
                                   className="form-control" 
                                   name="status"
                                   value={this.state.status}
                                   disabled />
                        </FormGroup>
                    </div>
                  </div>

                <div className="row">
                    <div className="col-md-6">
                    { this.state.atualizando ? 
                            (
                                <button onClick={this.atualizar} 
                                        className="btn btn-success">
                                        <i className="pi pi-refresh"></i> Atualizar
                                </button>
                            ) : (
                                <button onClick={this.submit} 
                                        className="btn btn-success">
                                        <i className="pi pi-save"></i> Salvar
                                </button>
                            )
                        }
                        <button onClick={e => this.props.history.push('/consulta-lancamentos')} 
                                className="btn btn-danger">
                                <i className="pi pi-times"></i>Cancelar
                        </button>
                    </div>
                </div>

            </Card>
        )
    }


}
export default withRouter(CadastroLancamentos)