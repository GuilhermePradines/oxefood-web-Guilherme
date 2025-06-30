import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormProduto() {

    const { state } = useLocation();
    const [idlivro, setIdLivro] = useState();

    const [autor, setAutor] = useState();
    const [titulo, setTitulo] = useState();
    const [qtdPaginas, setQtdPaginas] = useState();
    const [anoLancamento, setAnoLancamento] = useState();
    const [preco, setPreco] = useState();


    const [listaEditora, setListaEditora] = useState([]);
    const [idEditora, setIdEditora] = useState();

    useEffect(() => {

        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/livro/" + state.id)
                .then((response) => {
                    setIdLivro(response.data.id)
                    setTitulo(response.data.titulo)
                    setAutor(response.data.autor)
                    setAnoLancamento(response.data.anoLancamento)
                    setQtdPaginas(response.data.qtdPaginas)
                    setPreco(response.data.preco)
                    setIdEditora(response.data.editora.id)
                })
        }

        axios.get("http://localhost:8080/api/editora")
            .then((response) => {
                const dropDownEditora = response.data.map(c => ({ text: c.nome, value: c.id }));
                setListaEditora(dropDownEditora);
            })

    }, [state])

    function salvar() {

        let livroRequest = {
            idlivro: idlivro,
            autor: autor,
            idEditora: idEditora,
            titulo: titulo,
            anoLancamento: anoLancamento,
            qtdPaginas: qtdPaginas,
            preco: preco,

        }

        if (idlivro != null) {
            axios.put("http://localhost:8080/api/livro/" + idlivro, livroRequest)
                
                .catch((error) => {
                    if (error.response.data.errors !== undefined) {
                        for (let i = 0; i < error.response.data.errors.length; i++) {
                            
                        }
                    } else {
                        
                    }
                })
        } else {
            axios.post("http://localhost:8080/api/livro", livroRequest)
                
                .catch((error) => {
                    if (error.response.data.errors !== undefined) {
                        for (let i = 0; i < error.response.data.errors.length; i++) {
                           
                        }
                    } else {
                        
                    }
                })
        }
    }

    return (
        <div>

            <MenuSistema />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                     { idlivro === undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Livro &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    { idlivro !== undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Livro &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group>

                                <Form.Input
                                    required
                                    label='Título'
                                    placeholder='Informe o título do livro'
                                    width={12}
                                    tabIndex='1'
                                    maxLength="300"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='autor do Livro'
                                    placeholder='Informe o autor do livro'
                                    width={5}
                                    tabIndex='2'
                                    maxLength='10'
                                    value={autor}
                                    onChange={e => setAutor(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Select
                                required
                                fluid
                                placeholder='Selecione'
                                label='Editora'
                                options={listaEditora}
                                value={idEditora}
                                onChange={(e, { value }) => {
                                    setIdEditora(value)
                                }}
                            />



                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Preço'
                                    tabIndex='5'
                                    name='preco'
                                    width={6}
                                    value={preco}
                                    onChange={e => setPreco(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    placeholder='100'
                                    label='Quantidade de Paginas'
                                    width={5}
                                    tabIndex='6'
                                    maxLength="4"
                                    value={qtdPaginas}
                                    onChange={e => setQtdPaginas(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    placeholder='2000'
                                    label='Ano de Lancamento'
                                    width={5}
                                    tabIndex='7'
                                    maxLength="4"
                                    value={anoLancamento}
                                    onChange={e => setAnoLancamento(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal' style={{ marginTop: '4%', justifyContent: 'space-between' }}>

                                <Button
                                    tabIndex='8'
                                    label='Voltar'
                                    circular
                                    color='orange'
                                    icon='reply'
                                    as={Link}
                                    to='/list-produto'
                                />

                                <Button
                                    tabIndex='9'
                                    label='Salvar'
                                    circular
                                    color='blue'
                                    icon='save'
                                    floated='right'
                                    onClick={() => salvar()}
                                />

                            </Form.Group>

                        </Form>
                    </div>
                </Container>
            </div>
        </div>
    )
}