import axios from "axios";
import InputMask from 'comigo-tech-react-input-mask';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormProduto () {

    const [titulo, setTitulo] = useState();
    const [codigo, setCodigo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnidade, setValorUnidade] = useState();
    const [tempoMinimo, setTempoMinimo] = useState();
    const [tempoMaximo, setTempoMaximo] = useState();
    const { state } = useLocation();
    const [idProduto, setIdProduto] = useState();

    useEffect(() => {
                if (state != null && state.id != null) {
                    axios.get("http://localhost:8080/api/cliente/" + state.id)
    .then((response) => {
                                setIdProduto(response.data.id)
                                setTitulo(response.data.titulo) 
                                setCodigo(response.data.codigo)
                                setDescricao(response.data.descricao)
                                setValorUnidade(response.data.valorUnidade)
                                setTempoMinimo(response.data.tempoMinimo)
                                setTempoMaximo(response.data.tempoMaximo) 
                    })
                }
        }, [state])

    function salvar() {

        let produtoRequest = {
            titulo: titulo,
            codigo: codigo,
            descricao: descricao,
            valorUnidade: valorUnidade,
            tempoMinimo: tempoMinimo,
            tempoMaximo: tempoMaximo
        }

        if (idProduto != null) { //Alteração:
           axios.put("http://localhost:8080/api/cliente/" + idProduto, produtoRequest)
           .then((response) => { console.log('Cliente alterado com sucesso.') })
           .catch((error) => { console.log('Erro ao alter um cliente.') })
       } else { //Cadastro:
           axios.post("http://localhost:8080/api/cliente", produtoRequest)
           .then((response) => { console.log('Cliente cadastrado com sucesso.') })
           .catch((error) => { console.log('Erro ao incluir o cliente.') })
       }

    
        
    }

    return (

        <div>

            <MenuSistema tela={'produto'} />

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    { idProduto === undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    { idProduto !== undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength="100"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={codigo}
                                        onChange={e => setCodigo(e.target.value)}
                                    /> 
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal'  > 
                                <Form.Input
                                    required
                                    fluid
                                    label='Descrição'
                                    maxLength="200"
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}
                                />
                            </Form.Group>
                            
                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unidade'
                                    width={6}>
                                    <InputMask
                                        
                                        value={valorUnidade}
                                        onChange={e => setValorUnidade(e.target.value)}
                                    />
                                </Form.Input>
                                

                                <Form.Input
                                    required
                                    fluid
                                    label='Tempo de Entrega Mínimo em minutos'
                                    width={6}>
                                    <InputMask 
                                        mask="999"
                                        value={tempoMinimo}
                                        onChange={e => setTempoMinimo(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Tempo de Entrega Máximo em minutos'
                                    width={6}
                                >
                                    <InputMask 
                                        mask="999"
                                        maskChar={null}
                                        value={tempoMaximo}
                                        onChange={e => setTempoMaximo(e.target.value)}
                                       
                                    /> 
                                </Form.Input>

                            </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

                            <Link to={'/list-cliente'}>
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>
                            </Link>


                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>
                    
                </Container>
            </div>
        </div>

    );

}