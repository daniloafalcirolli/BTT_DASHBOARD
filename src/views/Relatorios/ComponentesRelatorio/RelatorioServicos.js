import React from 'react'
import { FaSearch, FaWindowClose, FaFileDownload, FaDownload } from 'react-icons/fa';
import { GET_SERVICOS_INTERVAL } from '../../../api';
import ModalFuncionario from './Modals/ModalFuncionario';
import ModalEmpresa from './Modals/ModalEmpresa';
import Input from '../../../components/Input/Input';

import { useNavigate } from 'react-router-dom';
import styles from './Styles/style.module.css';
import { FormControl, MenuItem, Select, Tooltip } from '@mui/material';
import ModalProvedor from './Modals/ModalProvedor';
import "./Styles/RelatorioServicos.module.css";

const RelatorioServicos = () => {
    const [data, setData] = React.useState([]);
    const [funcionario, setFuncionario] = React.useState({});
    const [provedor, setProvedor] = React.useState({});
    const [empresa, setEmpresa] = React.useState({});
    const [dataInicio, setDataInicio] = React.useState("");
    const [dataFinal, setDataFinal] = React.useState("");
    const [status_servico, setStatusServico] = React.useState("");
    const [relatorioNormal, setRelatorioNormal] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetchData();
    };

    React.useEffect(() => {
        if (window.localStorage.hasOwnProperty("status_servico_relatorio_servicos")) {
            setStatusServico(window.localStorage.getItem('status_servico_relatorio_servicos'));
        }
        if (window.localStorage.hasOwnProperty('funcionario_relatorio_servicos')) {
            setFuncionario(JSON.parse(window.localStorage.getItem('funcionario_relatorio_servicos')));
        }
        if (window.localStorage.hasOwnProperty('provedor_relatorio_servicos')) {
            setProvedor(JSON.parse(window.localStorage.getItem('provedor_relatorio_servicos')));
        }
        if (window.localStorage.hasOwnProperty('data_relatorio_servicos')) {
            setData(JSON.parse(window.localStorage.getItem('data_relatorio_servicos')));
        }
        setDataInicio(window.localStorage.getItem('data_inicio_relatorio_servicos') ?? "")
        setDataFinal(window.localStorage.getItem('data_final_relatorio_servicos') ?? "")
    }, []);

    React.useEffect(() => {
        window.localStorage.setItem('status_servico_relatorio_servicos', status_servico);
        window.localStorage.setItem('funcionario_relatorio_servicos', JSON.stringify(funcionario));
        window.localStorage.setItem('provedor_relatorio_servicos', JSON.stringify(provedor));
        window.localStorage.setItem('data_inicio_relatorio_servicos', dataInicio);
        window.localStorage.setItem('data_final_relatorio_servicos', dataFinal);
        window.localStorage.setItem('data_relatorio_servicos', JSON.stringify(data));
    }, [status_servico, funcionario, provedor, dataInicio, dataFinal, data]);

    const fetchData = async () => {
        let json_data = {};
        json_data.data_inicio = dataInicio;
        json_data.data_final = dataFinal;
        json_data.status = status_servico;
        json_data.cpf_funcionario = funcionario.cpf ? funcionario.cpf : "";
        json_data.id_provedor = provedor.id ? provedor.id : "";
        json_data.empresa = empresa.id ? empresa.id : "";
        
        let { url, options } = GET_SERVICOS_INTERVAL(json_data);
        let response = await fetch(url, options);
        let json = await response.json();
        setData(json);
    };

    const changeDataInicio = (event) => {
        setDataInicio(event.target.value);
    }

    const changeDataFinal = (event) => {
        setDataFinal(event.target.value);
    }

    const changeEmpresa = (empresa) => {
        setEmpresa(empresa);
    }

    const limparCampos = () => {
        setDataInicio("");
        setDataFinal("");
        setStatusServico("");
        setFuncionario({});
        setProvedor({});
        setData([]);
        setEmpresa({});
    }

    const redirectToDescription = (event) => {
        navigate(`/servico/${event.currentTarget.id}`);
    }

    const generateRelatorioModeloUnifique = () => {
        if(provedor.name !== undefined){
            if(provedor.name.toUpperCase() !== "UNIFIQUE"){
                alert("Relatório modelo unifique só pode ser gerado para os serviços que tenham a unifique como provedor!")
            } else {
                console.log("liberar");
                console.log(data)
            }
        }else{
            alert("Relatório modelo unifique só pode ser gerado para os serviços que tenham a unifique como provedor!")
        }
    }

    const generateRelatorioModeloPadrao = () => {
        if(data.length != 0){
            let csv = ""
            csv+="funcionario;servico;provedor;status;cliente;contrato;data;hora finalizacao\n"
            data.forEach(function(e){
                csv+=`${e.funcionario};`;
                csv+=`${e.provedor};`;
                csv+=`${e.servico_provedor};`;
                csv+=`${e.status};`;
                csv+=`${e.cliente};`;
                csv+=`${e.contrato};`;
                csv+=`${e.data_inicio};`;
                csv+=`${e.hora_finalizacao};`;
                csv+=`\n`
            })
            let link = document.querySelector("#downloadbutton");
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', 'relatorio.csv');
            link.click();
        }
    }

    return (
        <>
            <div className="btn-float">
                <a id="downloadbutton"></a>
                <Tooltip title="Relatório modelo unifique" onClick={generateRelatorioModeloUnifique}>
                    <button className="btn btn-primary rounded-circle fixItem">
                        <FaFileDownload />
                    </button>
                </Tooltip>

                <Tooltip title="Relatório modelo padrão" onClick={generateRelatorioModeloPadrao}>
                    <button className="btn btn-primary rounded-circle">
                        <FaDownload />
                    </button>
                </Tooltip>
            </div>
            <div className="card">
                <div className="col-12 row d-flex">
                    <div className="col-6">
                        <label>Pesquisar funcionário</label>
                        <ModalFuncionario funcionario={setFuncionario} />
                    </div>
                    <div className="col-6">
                        <Input type="text" label="Funcionário selecionado" disabled value={funcionario.nome ? funcionario.nome : "--"} />
                    </div>
                </div>
                <div className="col-12 row d-flex">
                    <div className="col-6">
                        <label>Pesquisar provedor</label>
                        <ModalProvedor provedor={setProvedor} />
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
                    <div className="col-6">
                        <label>Status do serviço</label>
                        <FormControl fullWidth>
                            <Select
                                id="categoria-servico"
                                value={status_servico}
                                onChange={(event) => { setStatusServico(event.target.value) }}
                            >
                                <MenuItem value="" selected>Todos</MenuItem>
                                <MenuItem value="em andamento">Em andamento</MenuItem>
                                <MenuItem value="quebra">Quebra</MenuItem>
                                <MenuItem value="quebra sem ir ao local">Quebra sem ir ao local</MenuItem>
                                <MenuItem value="finalizado">Finalizado</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="col-6 row">
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
                </div>
                <div className="col-12">
                    <div className="table">
                        <div className={`table-head ${styles.table_head_serv}`}>
                            <div className='table-head-row'>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Funcionário</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Empresa</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Cliente</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Contrato</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Protocolo</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Provedor</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Serviço</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>status</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Data Inicio</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Hora finalização</span>
                                </div>
                            </div>
                        </div>

                        <div className={`table-boy ${styles.table_body_serv}`}>
                            {
                                data.map((item, index) => {
                                    return (
                                        <div className='table-row clickable' key={index} onClick={redirectToDescription} id={item.id}>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.funcionario}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.empresa}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.cliente}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.contrato}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.protocolo}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.provedor}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.servico_provedor}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.status}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.data_inicio}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.hora_finalizacao ? item.hora_finalizacao : "--"}</span>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RelatorioServicos