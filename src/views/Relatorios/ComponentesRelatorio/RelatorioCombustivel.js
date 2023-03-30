import React from 'react'
import { FaSearch, FaWindowClose } from 'react-icons/fa'
import Input from '../../../components/Input/Input'
import { API_URL } from '../../../config'
import Map from '../../../components/Maps/Map';
import ModalCidade from './Modals/ModalCidade'
import ModalFuncionario from './Modals/ModalFuncionario'
import ModalProvedor from './Modals/ModalProvedor'
import ModalEmpresa from './Modals/ModalEmpresa';
import styles from './Styles/style.module.css';

const RelatorioCombustivel = () => {
    const [funcionario, setFuncionario] = React.useState({});
    const [provedor, setProvedor] = React.useState({});
    const [cidade, setCidade] = React.useState({});
    const [empresa, setEmpresa] = React.useState({});
    const [dataInicio, setDataInicio] = React.useState("");
    const [dataFinal, setDataFinal] = React.useState("");
    const [routes, setRoutes] = React.useState(null);
    const [totalDist, setTotalDist] = React.useState(0);
    const [cabecalho] = React.useState(["Funcionário", "Empresa", "Cidade", "Data", "Distância", "Valor", "Valor Adicional (10%)", "Valor Final"])
    const [dataTable, setDataTable] = React.useState([]);

    const limparCampos = () => {
        setFuncionario({});
        setProvedor({});
        setCidade({});
        setDataInicio("");
        setDataFinal("");
        setDataTable([]);
        setEmpresa({});
    }

    const changeCidade = (cidade) => {
        setCidade(cidade);
        setProvedor({});
        setFuncionario({});
        setEmpresa({});
    }

    const changeProvedor = (provedor) => {
        setProvedor(provedor);
        setCidade({});
        setFuncionario({});
        setEmpresa({});
    }
    
    const changeEmpresa = (empresa) => {
        setEmpresa(empresa);
        setCidade({});
        setFuncionario({});
        setProvedor({});
    }

    const changeFuncionario = (funcionario) => {
        setFuncionario(funcionario);
        setCidade({});
        setEmpresa({});
        setProvedor({});
    }

    const changeDataInicio = (event) => {
        setDataInicio(event.target.value);
    }

    const changeDataFinal = (event) => {
        setDataFinal(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetchData();
    };

    const fetchData = async () => {
        let json_data = {};
        json_data.data_inicio = dataInicio;
        json_data.data_final = dataFinal;
        json_data.cpf_funcionario = funcionario.cpf ? funcionario.cpf : "";
        json_data.nome_cidade = cidade.cidade ? cidade.cidade : "";
        json_data.id_provedor = provedor.id ? provedor.id : 0;
        json_data.empresa = empresa.id ? empresa.id : 0;

        let url = API_URL + "/api/rotas/relatorio/combustivel";
        let settings = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json_data)
        }
        let response = await fetch(url, settings);
        let json = await response.json();

        setDataTable([]);
        setRoutes([]);
        let array = [];
        Object.values(json).forEach(x => {
            Object.values(x).forEach(y => {
                array.push(y);
                setRoutes(routes => [...routes, y]);
            })
        });
    };

    const appendToTable = (responseMap) => {
        let calculatedDistance = 0;
        responseMap.routes[0].legs.forEach((x, index) => {
            calculatedDistance += x.distance.value;
        });

        let valorFinal = (((calculatedDistance / 1000) / responseMap.consumo) * responseMap.gasolina).toFixed(2);
        let row = {
            funcionario: responseMap.nome_funcionario,
            cidade: responseMap.nome_cidade,
            data: responseMap.data,
            distancia: calculatedDistance / 1000,
            valor: valorFinal,
            empresa: responseMap.empresa
        };
        
        setDataTable(dataTable => [...dataTable, row]);
    }
    
    return (
        <div className="card">
            <div className="col-12 row d-flex">
                <div className="col-6">
                    <label>Pesquisar por funcionário</label>
                    <ModalFuncionario funcionario={changeFuncionario} />
                </div>
                <div className="col-6">
                    <Input type="text" label="Funcionário selecionado" disabled value={funcionario.nome ? funcionario.nome : "--"} />
                </div>
            </div>
            <div className="col-12 row d-flex">
                <div className="col-6">
                    <label>Pesquisar por cidade</label>
                    <ModalCidade cidade={changeCidade} />
                </div>
                <div className="col-6">
                    <Input type="text" label="Cidade selecionada" disabled value={cidade.cidade ? cidade.cidade : "--"} />
                </div>
            </div>
            <div className="col-12 row d-flex">
                <div className="col-6">
                    <label>Pesquisar por provedor</label>
                    <ModalProvedor provedor={changeProvedor} />
                </div>
                <div className="col-6">
                    <Input type="text" label="Provedor selecionado" disabled value={provedor.name ? provedor.name : "--"} />
                </div>
            </div>
            <div className="col-12 row d-flex">
                <div className="col-6">
                    <label>Pesquisar por Empresa</label>
                    <ModalEmpresa empresa={changeEmpresa} />
                </div>
                <div className="col-6">
                    <Input type="text" label="Empresa selecionada" disabled value={empresa.nome ? `${empresa.nome} - ${empresa.razao_social}` : "--"} />
                </div>
            </div>
            <div className="col-12 row d-flex">
                <div className="col-6">
                    <label>Data Inicio</label>
                    <input type="date" value={dataInicio} onChange={changeDataInicio} />
                </div>

                <div className="col-6">
                    <label>Data Final</label>
                    <input type="date" value={dataFinal} onChange={changeDataFinal} />
                </div>
            </div>
            <div className="col-12 row d-flex">
                <div className="col-6 d-flex align-items-end justify-content-center">
                    <div className="d-flex align-items-center">
                        <button className='btn btn-primary mr-4' onClick={limparCampos}>
                            <FaWindowClose />
                        </button>
                        <label className="p-0">Limpar campos</label>
                    </div>
                </div>
                <div className="col-6 d-flex align-items-end justify-content-center">
                    <div className="d-flex align-items-center">
                        <button className='btn btn-primary mr-4' onClick={handleSubmit}>
                            <FaSearch />
                        </button>
                        <label className="p-0">Pesquisar</label>
                    </div>
                </div>
            </div>
            <div className="col-12 text-center">
                <p className="text-danger mt-4">Atenção!</p>
                <p>Não é possível filtrar por cidade e provedor ao mesmo tempo!</p>
            </div>
            {
                dataTable.length > 0 &&
                <>
                    <div className=" mt-4">
                        <div className="table">
                            <div className={`table-head ${styles.table_head_serv}`}>
                                <div className="table-head-row">
                                    {
                                        cabecalho &&
                                        cabecalho.map((item, index) => {
                                            return (
                                                <div className={`table-cell ${styles.table_cell_serv}`} key={index}>
                                                    <span>{item}</span>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            <div className={`table-boy ${styles.table_body_serv}`}>
                                {
                                    dataTable.map((item, index) => {
                                        return (
                                            <div className="table-row" key={index}>
                                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                                    <span>{item.funcionario}</span>
                                                </div>
                                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                                    <span>{item.empresa}</span>
                                                </div>
                                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                                    <span>{item.cidade}</span>
                                                </div>
                                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                                    <span>{item.data}</span>
                                                </div>
                                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                                    <span>{item.distancia.toString().replace(".", ",")} km</span>
                                                </div>
                                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                                    <span>R$ {item.valor}</span>
                                                </div>
                                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                                    <span>R$ {((item.valor * 10) / 100).toFixed(2)}</span>
                                                </div>
                                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                                    <span>R$ {(Number(((item.valor * 10) / 100).toFixed(2))+Number(item.valor)).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
            {
                routes != null &&
                routes.map((x, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Map 
                                directions={x}
                                responseMap={appendToTable}
                                distance={setTotalDist}
                                renderMap={false}
                            /> 
                        </React.Fragment>
                    );
                })
            }
        </div>
    )
}

export default RelatorioCombustivel