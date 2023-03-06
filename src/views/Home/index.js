import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Configuracoes from '../Configuracoes';
import Provedores from '../Provedores/ListProvedor';
import Relatorios from '../Relatorios';
import ServicoDescricao from '../Servicos';
import Empresas from '../Empresas/Empresas';
import EditFuncionario from '../Funcionarios/EditFuncionario';
import ListFuncionarios from '../Funcionarios/ListFuncionarios';
import ListStatus from '../StatusFuncionario/ListStatus';
import AddStatus from '../StatusFuncionario/AddStatus';
import ListCidades from '../Cidades/ListCidades';
import EditCidade from '../Cidades/EditCidade';
import AddCidade from '../Cidades/AddCidade';
import AddMaterialAplicado from '../Materiais/MateriaisAplicados/AddMaterialAplicado';
import EditMaterialAplicado from '../Materiais/MateriaisAplicados/EditMaterialAplicado';
import AddMaterialRetirado from '../Materiais/MateriaisRetirados/AddMaterialRetirado';
import EditMaterialRetirado from '../Materiais/MateriaisRetirados/EditMaterialRetirado';
import MateriaisRetirados from '../Materiais/MateriaisRetirados/ListMaterialRetirado';
import MateriaisAplicados from '../Materiais/MateriaisAplicados/ListMaterialAplicado';
import MateriaisHub from '../Materiais/MateriaisHub/Materiais';
import ListFotos from '../Fotos/ListFoto';
import AddFoto from '../Fotos/AddFoto';
import EditFoto from '../Fotos/EditFoto';
import ListBases from '../Bases/ListBases';
import AddBase from '../Bases/AddBase';
import EditBase from '../Bases/EditBase';
import ListCampos from '../CamposProvedor/ListCampos';
import AddCampo from '../CamposProvedor/AddCampo';
import EditCampo from '../CamposProvedor/EditCampo';
import ListCategorias from '../CategoriasServico/ListCategorias';
import AddCategoria from '../CategoriasServico/AddCategoria';
import EditCategoria from '../CategoriasServico/EditCategoria';
import ListParametrizacoes from '../Parametrizacoes/ListParametrizacoes';
import AddParametro from '../Parametrizacoes/AddParametro';
import EditParametro from '../Parametrizacoes/EditParametro';
import ListUsers from '../MastersUsers/ListUsers';
import AddUser from '../MastersUsers/AddUser';
import EditUser from '../MastersUsers/EditUser';
import ListProvedores from '../Provedores/ListProvedor';
import AddProvedor from '../Provedores/AddProvedor';
import EditProvedor from '../Provedores/EditProvedor';

const Home = () => {
  return (
    <>
      <Sidebar />

      <div className="container">
        <div className="container-fluid">
          <Routes>
            <Route path="/configuracoes" element={ <Configuracoes /> } />
            <Route path="/servico/:id" element={ <ServicoDescricao /> } />

            <Route path="/empresas" element={ <Empresas /> } />

            <Route path="/funcionarios" element={ <ListFuncionarios /> } />
            <Route path="/funcionarios/:id" element={ <EditFuncionario /> } />

            <Route path="/status/funcionario" element={ <ListStatus /> } />
            <Route path="/status/funcionario/add" element={ <AddStatus /> } />
          
            <Route path="/users" element={ <ListUsers /> } />
            <Route path="/users/add" element={ <AddUser />} />
            <Route path="/users/:id" element={ <EditUser /> } />

            <Route path="/cidades" element={ <ListCidades /> } />
            <Route path="/cidades/:id" element={ <EditCidade /> } />
            <Route path="/cidades/add" element={ <AddCidade /> } />

            <Route path="/parametrizacoes" element={ <ListParametrizacoes /> } />
            <Route path="/parametrizacoes/add" element={ <AddParametro /> } />
            <Route path="/parametrizacoes/:id" element={ <EditParametro /> } />

            <Route path="/materiais" element={ <MateriaisHub /> } />

            <Route path="/materiais/aplicados" element={ <MateriaisAplicados /> } />
            <Route path="/materiais/aplicados/add" element={ <AddMaterialAplicado /> }/>
            <Route path="/materiais/aplicados/:id" element={ <EditMaterialAplicado /> } />

            <Route path="/materiais/retirados" element={ <MateriaisRetirados /> } />
            <Route path="/materiais/retirados/add" element={ <AddMaterialRetirado /> } />
            <Route path="/materiais/retirados/:id" element={ <EditMaterialRetirado /> }/>

            <Route path="/provedores" element={ <ListProvedores /> } />
            <Route path="/provedores/add" element={ <AddProvedor /> } />
            <Route path="/provedores/:id" element={ <EditProvedor /> } />

            <Route path="/provedores/campos" element={ <ListCampos /> } />
            <Route path="/provedores/campos/add" element={ <AddCampo /> } />
            <Route path="/provedores/campos/:id" element={ <EditCampo /> } />

            <Route path="/provedores/bases" element={ <ListBases /> } />
            <Route path="/provedores/bases/add" element={ <AddBase /> } />
            <Route path="/provedores/bases/:id" element={ <EditBase /> } />

            <Route path="/provedores/fotos" element={ <ListFotos /> } />
            <Route path="/provedores/fotos/add" element={ <AddFoto /> } />
            <Route path="/provedores/fotos/:id" element={ <EditFoto /> } />

            <Route path="/provedores/categorias-servico" element={ <ListCategorias /> } />
            <Route path="/provedores/categorias-servico/add" element={ <AddCategoria /> } />
            <Route path="/provedores/categorias-servico/:id" element={ <EditCategoria /> } />

            <Route path="/relatorios/*" element={<Relatorios />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default Home;