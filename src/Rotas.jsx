import { Route, Routes } from "react-router-dom";
import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import Home from './views/home/Home';
import FormLivro from './views/Livro/FormLivro';
import ListLivro from './views/Livro/ListLivro';
import FormLogin from "./views/login/FormLogin";
import FormProduto from './views/produto/FormProduto';
import ListProduto from './views/produto/ListProduto';
import { ProtectedRoute } from "./views/util/ProtectedRoute";

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<FormLogin />} />
                <Route path="/home" element={<Home />} />
                <Route path="form-cliente" element={<ProtectedRoute><FormCliente /> </ProtectedRoute>} />
                <Route path="list-cliente" element={<ProtectedRoute><ListCliente /></ProtectedRoute>} />
                <Route path="form-produto" element={<ProtectedRoute><FormProduto /></ProtectedRoute>} />
                <Route path="list-produto" element={<ListProduto />} />
                <Route path="list-produto" element={<ProtectedRoute><ListProduto /></ProtectedRoute>} />
                <Route path='form-livro' element={<ProtectedRoute><FormLivro /></ProtectedRoute>} />
                <Route path='list-livro' element={<ProtectedRoute><ListLivro /></ProtectedRoute>} />
            </Routes>
        </>
    )
}

export default Rotas