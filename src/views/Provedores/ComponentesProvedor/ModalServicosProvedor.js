import React from 'react'
import AbstractModal from '../../../components/Modal/AbstractModal';
import Input from '../../../components/Input/Input';
import useForm from '../../../hooks/useForm';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ADD_SERVICO_PROVEDOR, DELETE_SERVICO_PROVEDOR, EDIT_SERVICO_PROVEDOR, GET_ALL_SERVICOS_PROVEDOR_SEARCH, GET_PROVEDOR } from '../../../services/provedores/ProvedorService';
import { FormControl, MenuItem, Select } from '@mui/material';
import { GET_ALL_CATEGORIA_SERVICO } from '../../../api';

const ModalServicosProvedor = (props) => {
    const servico = useForm();
    const identificador = useForm();
    const idSenior = useForm();
    const [search, setSearch] = React.useState("");
    const [modal, setModal] = React.useState(false);
    const [fields, setFields] = React.useState(false);
    const [categoriasServico, setCategoriasServico] = React.useState([]);
    const [idCategoriaServico, setIdCategoriaServico] = React.useState("");
    const [idServico, setIdServico] = React.useState(0);
    const [edit, setEdit] = React.useState(false);
    const [data, setData] = React.useState([]);

    const toggleModal = () => setModal(!modal);

    const toggleFields = () => setFields(!fields);

    const toggleAdd = () => {
        setEdit(false);
        limparCampos();
        toggleFields();
    }

    const toggleEdit = (event) => {
        setEdit(true);
        setIdServico(event.currentTarget.id);
        let servico_obj = data.find((x) => x.id === Number(event.currentTarget.id));
        servico.setValue(servico_obj.servico);
        identificador.setValue(servico_obj.identificador);
        idSenior.setValue(servico_obj.id_senior);
        setIdCategoriaServico(servico_obj.categoria.id);
        if (!fields) {
            toggleFields();
        }
    }

    const submitAdd = async () => {
        if (idCategoriaServico !== null && idCategoriaServico !== 0 && idCategoriaServico !== "") {
            let { url, options } = ADD_SERVICO_PROVEDOR({ servico: servico.value, id_senior: idSenior.value, identificador: identificador.value, id_provedor: props.idProvedor, id_categoria: idCategoriaServico });
            let response = await fetch(url, options);
            if (response.status === 200) {
                alert("Adicionado com sucesso!");
                limparCampos();
                toggleAdd();
                loadServicos();
            }
        }
    };

    const submitEdit = async () => {
        let { url, options } = EDIT_SERVICO_PROVEDOR({ id_serv: idServico, servico: servico.value, id_senior: idSenior.value, identificador: identificador.value, id_provedor: props.idProvedor, id_categoria: idCategoriaServico});
        let response = await fetch(url, options);
        if (response.status === 200) {
            alert("Editado com sucesso!");
            limparCampos();
            toggleAdd();
            loadServicos();
        }
    };

    const handleSubmit = () => {
        if (edit) {
            submitEdit();
        } else {
            submitAdd();
        }
    }

    const handleDeleteServico = async (event) => {
        if (window.confirm("Tem certeza que deseja excluir?")) {
            const { url, options } = DELETE_SERVICO_PROVEDOR(props.idProvedor, event.currentTarget.id);
            let response = await fetch(url, options);
            if (response.status === 200) {
                alert("Removido com sucesso!");
                loadServicos();
            }
        } else {
            alert("Ocorreu um erro!");
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        let { url, options } = GET_ALL_SERVICOS_PROVEDOR_SEARCH({ id_provedor: props.idProvedor, value: search.toUpperCase() });
        let response = await fetch(url, options);
        let json = await response.json();
        setData(json);
    };

    const limparCampos = () => {
        servico.setValue("");
        idSenior.setValue("");
        identificador.setValue("");
        setIdCategoriaServico("");
    }

    const loadServicos = async () => {
        let { url } = GET_PROVEDOR(props.idProvedor);
        let response = await fetch(url);
        let json = await response.json();
        setData(json.servicos);
    }

    const loadCategoriasServico = async () => {
        let { url } = GET_ALL_CATEGORIA_SERVICO();
        let response = await fetch(url);
        let json = await response.json();
        setCategoriasServico(json);
    }

    React.useEffect(() => {
        loadServicos();
        loadCategoriasServico();
    }, [modal, props.idProvedor])

    return (
        <>
            <button className='btn btn-primary' onClick={toggleModal}>Serviços do Provedor</button>
            {
                modal &&
                <AbstractModal modalTitle="Relacione os campos ao provedor" isOpen={modal} openModal={toggleModal}>
                    <div className="row">
                        <div className="col-12">
                            <button className='btn btn-primary' onClick={toggleAdd}>{fields ? "X" : "Adicionar serviço"}</button>
                        </div>
                        {
                            fields &&
                            <div className="col-12 row mt-3">
                                <div className="col-12">
                                    <Input type="text" label="Serviço" id="servico" name="servico" {...servico} />
                                </div>
                                <div className="col-12">
                                    <Input type="text" label="ID Sênior" id="id_senior" name="id_senior" {...idSenior} />
                                </div>
                                <div className="col-12">
                                    <Input type="text" label="Identificador" id="identificador" name="identificador" {...identificador} />
                                </div>
                                <div className="col-12">
                                    <label>Categoria do serviço</label>
                                    <FormControl fullWidth>
                                        <Select
                                            id="categoria-servico"
                                            value={idCategoriaServico}
                                            onChange={(event) => { setIdCategoriaServico(event.target.value) }}
                                        >
                                            <MenuItem value="" disabled selected>Selecione</MenuItem>
                                            {
                                                categoriasServico &&
                                                categoriasServico.map((item, index) => {
                                                    return (
                                                        <MenuItem key={index} value={item.id}>{item.categoria}</MenuItem>
                                                    );
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="col-12 mt-4">
                                    <button className='btn btn-primary' onClick={handleSubmit}>{edit ? "Editar serviço" : "Salvar serviço"}</button>
                                </div>
                            </div>
                        }
                        {
                            data &&
                            <>
                                <div className='col-12 table'>
                                    <div className="table-controllers">
                                        <form onSubmit={handleSearch}>
                                            <label>Pesquisar</label>
                                            <input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                        </form>
                                    </div>
                                    <div className='table-head'>
                                        <div className='table-head-row'>
                                            <div className='table-cell'>
                                                <span>Serviço</span>
                                            </div>
                                            <div className='table-cell'>
                                                <span>Id sênior</span>
                                            </div>
                                            <div className='table-cell'>
                                                <span>Ações</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='table-body'>
                                        {
                                            data.map((item, index) => {
                                                return (
                                                    <div className='table-row' key={index} >
                                                        <div className='table-cell'>
                                                            <span>{item.servico}</span>
                                                        </div>
                                                        <div className='table-cell'>
                                                            <span>{item.id_senior}</span>
                                                        </div>
                                                        <div className='table-cell'>
                                                            <span>
                                                                <button className="btn btn-primary mr-4" onClick={toggleEdit} id={item.id}>
                                                                    <FaEdit />
                                                                </button>
                                                                <button className="btn btn-primary" onClick={handleDeleteServico} id={item.id}>
                                                                    <FaTrash />
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </AbstractModal>
            }
        </>
    )
}

export default ModalServicosProvedor;