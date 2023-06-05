import React from 'react'
import { FaSearch, FaWindowClose, FaFileDownload, FaDownload } from 'react-icons/fa';
import {GET_SERVICES_UNIFIQUE} from "../../../services/servico_unifique/UnifiqueService";
import ModalFuncionario from './Modals/ModalFuncionario';
import ModalEmpresa from './Modals/ModalEmpresa';
import Input from '../../../components/Input/Input';

import { useNavigate } from 'react-router-dom';
import styles from './Styles/style.module.css';
import { FormControl, MenuItem, Select, Tooltip } from '@mui/material';
import "./Styles/RelatorioServicos.module.css";

const RelatorioServicosUnifique = () => {
    const [servicosUnifique, setServicosUnifique] = React.useState([]);
    const [funcionario, setFuncionario] = React.useState({});
    const [empresa, setEmpresa] = React.useState({});
    const [dataInicio, setDataInicio] = React.useState("");
    const [dataFinal, setDataFinal] = React.useState("");
    const [status_servico, setStatusServico] = React.useState("");
    const navigate = useNavigate();

    const changeToNumber = function(mes){
        let result;
        switch(mes){
            case "JANEIRO": 
                result = 1;
                break;
            case "FEVEREIRO": 
                result = 2;
                break;
            case "MARÇO": 
                result = 3;
                break;
            case "ABRIL": 
                result = 4;
                break;
            case "MAIO": 
                result = 5;
                break;
            case "JUNHO": 
                result = 6;
                break;
            case "JULHO": 
                result = 7;
                break;
            case "AGOSTO": 
                result = 8;
                break;
            case "SETEMBRO": 
                result = 9;
                break;
            case "OUTUBRO": 
                result = 10;
                break;
            case "NOVEMBRO": 
                result = 11;
                break;
            case "DEZEMBRO": 
                result = 12;
                break; 
        }
        return result;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetchData();
    };

    const gerarCSV = function(){
        let write = "";

        write += 'UNIDADE RESPONSÁVEL;' +
        'DIA;' +
        'MÊS;' +
        'ANO;' +
        'COMPETÊNCIA;' +
        'CÓD CLIENTE;' +
        'PROTOCOLO;' +
        'CLIENTE;' +
        'ENDEREÇO;' +
        'NUMERO;' +
        'BAIRRO;' +
        'CIDADE;' +
        'TIPO DE SERVIÇO;' +
        'CATEGORIA;' +
        'TÉC INSTALADOR;' +
        'CAIXA;' +
        'PORTA;' +
        'SINAL dBm;' +
        'PONTO MESH VIA CABO;' +
        'PONTO MESH WIFI;' +
        'FAST POINT;' +
        'PONTO DE TV;' +
        'LANÇAMENTO CORDOALHA;' +
        'ESPINAÇÃO DO CABO;' +
        'METRAGEM LANÇADA;' +
        'DIFERENÇA	+ DE 300 MTS;' +
        'STATUS O.S.;' +
        'TEC VISTORIADOR;' +
        'DATA VISTORIA;' +
        'OBS;' +
        'PENDÊNCIA;' +
        'DATA REGULARIZAÇÃO;' +
        'EMPRESA' +
        "\n";

        servicosUnifique.forEach(e=>{;
            write += `${e.unidade_responsavel};` +
            `${e.dia};` +
            `${e.mes};` +
            `${e.ano};;` +
            `${e.cod_cliente};` +
            `${e.protocolo};` +
            `${e.cliente};` +
            `${e.endereco};;;;` +
            `${e.tipo_servico};;` +
            `${e.tecnico};` +
            `${e.caixa};` +
            `${e.porta};` +
            `${e.sinal_dbm};` +
            `${e.ponto_mesh_via_cabo};` +
            `${e.ponto_mesh_via_wifi};` +
            `${e.fast_point};` +
            `${e.ponto_tv};;` +
            `${e.espinacao_cabo};` +
            `${e.metragem_lancada};;;;;;` +
            `${e.empresa}` +
            "\n";

        })

        let link = document.querySelector("#downloadbutton");
        const blob = new Blob([write], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', 'relatorio.csv');
        link.click();
        
    }

    const fetchData = async () => {
        let json_data = {};
        json_data.data_inicio = dataInicio;
        json_data.data_final = dataFinal;
        json_data.status = status_servico;
        json_data.cpf_funcionario = funcionario.cpf ? funcionario.cpf : "";
        json_data.empresa = empresa.id ? empresa.id : "";
        
        let { url, options } = GET_SERVICES_UNIFIQUE(json_data);
        let response = await fetch(url, options);
        let json = await response.json();
        setServicosUnifique(json);
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
        setServicosUnifique([]);
        setEmpresa({});
    }

    const redirectToDescription = (event) => {
        navigate(`/servico/${event.currentTarget.id}`);
    }

    return (
        <>
            <div className="btn-float">
                <a id="downloadbutton"></a>
                <Tooltip title="Relatório modelo unifique" onClick={gerarCSV}>
                    <button className="btn btn-primary rounded-circle fixItem">
                        <FaFileDownload />
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
                                    <span>Unidade<br/>Responsavel</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Data</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Codigo<br/>do cliente</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Protocolo</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Cliente</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Endereço</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Tipo<br/>serviço</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Tecnico</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Caixa</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Porta</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Sinal dBm</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>PONTO MESH VIA CABO</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>PONTO MESH WIFI</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>FAST POINT</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>PONTO DE TV</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>ESPINAÇÃO DO CABO</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>METRAGEM LANÇADA</span>
                                </div>
                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                    <span>Status</span>
                                </div>
                            </div>
                        </div>

                        <div className={`table-boy ${styles.table_body_serv}`}>
                            {
                                servicosUnifique.map((item, index) => {
                                    return (
                                        <div className='table-row clickable' key={index} onClick={redirectToDescription} id={item.id}>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.unidade_responsavel}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.dia}/{changeToNumber(item.mes)}/{item.ano}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.cod_cliente}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.protocolo}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.cliente}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.endereco}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.tipo_servico}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.tecnico}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.caixa}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.porta}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.sinal_dbm}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.ponto_mesh_via_cabo}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.ponto_mesh_via_wifi}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.fast_point}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.ponto_tv}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.espinacao_cabo}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.metragem_lancada}</span>
                                            </div>
                                            <div className={`table-cell ${styles.table_cell_serv}`}>
                                                <span>{item.status}</span>
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

export default RelatorioServicosUnifique