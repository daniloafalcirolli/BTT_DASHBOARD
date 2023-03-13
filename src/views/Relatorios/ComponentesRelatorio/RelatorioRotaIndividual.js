import React from 'react'
import { FaSearch, FaWindowClose } from 'react-icons/fa';
import Input from '../../../components/Input/Input';
import ModalFuncionario from './Modals/ModalFuncionario'
import Map from '../../../components/Maps/Map';
import { SEARCH_ROTAS_DATE } from '../../../services/rotas/RotasService';
import styles from './Styles/style.module.css';

const RelatorioRotaIndividual = () => {
    const [funcionario, setFuncionario] = React.useState({});
    const [data, setData] = React.useState("");
    const [routes, setRoutes] = React.useState([]);
    const [responseMap, setResponseMap] = React.useState([]);
    const [totalDist, setTotalDist] = React.useState(0);
    const [cabecalho] = React.useState(["Origem", "Destino", "Horário", "Distância", "Descrição"])
    const [table, setTable] = React.useState([]);
    const [error, setError] = React.useState(null);

    const changeData = (event) => {
        setData(event.target.value);
    }

    const handleSubmit = async () => {
        if (funcionario.cpf === undefined || data === "") {
            alert("Preencha todos os campos");
        } else {
            let { url, options } = SEARCH_ROTAS_DATE({ cpf_funcionario: funcionario.cpf, data: data });
            let response = await fetch(url, options);
            let json = await response.json();
            if (json.length > 0) {
                setError(null);
                setRoutes(json);
            } else {
                setRoutes([]);
                setResponseMap([]);
                setTotalDist(0);
                setTable([]);
                setError("Não foram encontradas rotas.")
            }
        }
    }

    const limparCampos = () => {
        setFuncionario({});
        setData("");
        setRoutes([]);
        setResponseMap([]);
        setTotalDist(0);
        setTable([]);
    }

    React.useEffect(() => {
        if (responseMap.status === "OK") {
            let array = [];

            for (let i = 0; i < routes.length; i++) {
                if (i === 0) {
                    array.push({
                        origem: responseMap.routes[0].legs[i].start_address,
                        destino: "--",
                        hora: routes[i].hora,
                        distancia: "--",
                        descricao: "Iniciou o dia"
                    });

                } else {
                    switch (routes[i].descricao) {
                        case "iniciou":
                            array.push({
                                origem: responseMap.routes[0].legs[i - 1].start_address,
                                destino: "--",
                                hora: routes[i].hora,
                                distancia: "--",
                                descricao: "Iniciou o dia"
                            });
                            break;
                        case "finalizou":
                            array.push({
                                origem: responseMap.routes[0].legs[i - 1].start_address,
                                destino: responseMap.routes[0].legs[i - 1].end_address,
                                hora: routes[i].hora,
                                distancia: responseMap.routes[0].legs[i - 1].distance.value,
                                descricao: "Finalizou o dia"
                            });
                            break;
                        case "rota":
                            array.push({
                                origem: responseMap.routes[0].legs[i - 1].start_address,
                                destino: responseMap.routes[0].legs[i - 1].end_address,
                                hora: routes[i].hora,
                                distancia: responseMap.routes[0].legs[i - 1].distance.value,
                                descricao: "Rota de serviço"
                            });
                            break;
                        case "base": 
                            array.push({
                                origem: responseMap.routes[0].legs[i - 1].start_address,
                                destino: responseMap.routes[0].legs[i - 1].end_address,
                                hora: routes[i].hora,
                                distancia: responseMap.routes[0].legs[i - 1].distance.value,
                                descricao: "Base"
                            });
                            break;
                        case "almoço": 
                            array.push({
                                origem: responseMap.routes[0].legs[i - 1].start_address,
                                destino: "--",
                                hora: routes[i].hora,
                                distancia: "--",
                                descricao: "Saída para almoço"
                            });
                            break;
                        default: 
                            array.push({
                                origem: responseMap.routes[0].legs[i - 1].start_address,
                                destino: responseMap.routes[0].legs[i - 1].end_address,
                                hora: routes[i].hora,
                                distancia: responseMap.routes[0].legs[i - 1].distance.value,
                                descricao: routes[i].descricao
                            });
                            break;
                    }
                }
            }
            setTable(array);
        }
    }, [responseMap]);

    return (
        <div className="card mb-5">
            <div className="col-12 row">
                <div className="col-3">
                    <label>Pesquisar funcionário</label>
                    <ModalFuncionario funcionario={setFuncionario} />
                </div>
                <div className="col-4">
                    <Input type="text" label="Funcionário selecionado" disabled value={funcionario.nome ? funcionario.nome : "--"} />
                </div>
                <div className="col-3">
                    <label>Data</label>
                    <input type="date" value={data} onChange={changeData} />
                </div>
                <div className="col-1 d-flex">
                    <div className="d-flex align-items-center mr-4">
                        <button className='btn btn-primary' onClick={handleSubmit}>
                            <FaSearch />
                        </button>
                    </div>
                    <div className="d-flex align-items-center">
                        <button className='btn btn-primary' onClick={limparCampos}>
                            <FaWindowClose />
                        </button>
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <Map
                        directions={routes}
                        responseMap={setResponseMap}
                        distance={setTotalDist}
                        renderMap={true}
                    />
                </div>
                {
                    routes.length > 0 && totalDist !== 0 ?
                        <>
                            <div className="col-12 row mt-4 text-center">
                                {
                                    routes[0].id_cidade === null || routes[0].id_cidade === 0 ?
                                        <>
                                            <div className="col-12 mb-4">
                                                <span>Atenção! Valor da gasolina </span>
                                                <span className="bg-danger text-white">não sinalizado</span>
                                                <span> para a cidade de <b>{routes[0].nome_cidade}</b> no dia <b>{`${data.split("-")[2]}/${data.split("-")[1]}/${data.split("-")[0]}`}</b>!</span>
                                            </div>
                                        </> :
                                        <>
                                            <div className="col-12 mb-4">
                                                <span>Valor da gasolina </span>
                                                <span className="bg-success text-white">sinalizado</span>
                                                <span> para a cidade de {routes[0].nome_cidade}!</span>
                                            </div>
                                        </>
                                }

                                <div className="col-4">
                                    <span>Consumo do funcionário: <b>{routes[0].consumo} km/l</b></span>
                                </div>
                                <div className="col-4">
                                    <span>Preço da gasolina: <b>R$ {routes[0].gasolina}</b></span>
                                </div>
                                <div className="col-4">
                                    <span>Distância total percorrida: <b>{(totalDist/1000).toString()} km</b></span>
                                </div>

                                <div className="d-flex align-items-center justify-content-center w-100">
                                    <div className="col-5 mt-4">
                                        <span>Valor de correção<br/> a ser pago para o funcionário:  <b>R$ {(((((totalDist / 1000) / routes[0].consumo) * routes[0].gasolina).toFixed(2)*10)/100).toFixed(2)}</b></span>
                                    </div>

                                    <div className="col-5 mt-4">
                                        <span>Valor a ser pago para o <br/>funcionário sem adição da correção:  <b>R$ {(((totalDist / 1000) / routes[0].consumo) * routes[0].gasolina).toFixed(2)}</b></span>
                                    </div>
                                </div>
                                <div className="col-12 mt-4">
                                        <span>Valor a ser pago para o funcionário:  <b>R$ {Number((((totalDist / 1000) / routes[0].consumo) * routes[0].gasolina).toFixed(2)) + Number((((((totalDist / 1000) / routes[0].consumo) * routes[0].gasolina).toFixed(2)*10)/100).toFixed(2))}</b></span>
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                {
                                    table.length > 0 &&
                                    <>
                                        <div className="table">
                                            <div className="table-head">
                                                <div className="table-head-row">
                                                    {
                                                        cabecalho &&
                                                        cabecalho.map((item, index) => {
                                                            return (
                                                                <div className="table-cell" key={index}>
                                                                    <span>{item}</span>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="table-body">
                                                {
                                                    table.map((item, index) => {
                                                        return (
                                                            <div className="table-row" key={index}>
                                                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                                                    <span>{item.origem}</span>
                                                                </div>
                                                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                                                    <span>{item.destino}</span>
                                                                </div>
                                                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                                                    <span>{item.hora}</span>
                                                                </div>
                                                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                                                    <span>{item.distancia != "--" ? item.distancia / 1000 + " km ": "--"}</span>
                                                                </div>
                                                                <div className={`table-cell ${styles.table_cell_serv}`}>
                                                                    <span>{item.descricao}</span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </> :
                        <>
                            {
                                error &&
                                <div className="col-12 mb-4">
                                    <span>{error}</span>
                                </div>
                            }

                        </>
                }

            </div>
        </div>
    )
}

export default RelatorioRotaIndividual