import React from 'react'
import AbstractModal from '../../../components/Modal/AbstractModal';
import { ADD_CAMPOS_AO_PROVEDOR, GET_ALL_CAMPOS, GET_ALL_CAMPOS_SEARCH, GET_PROVEDOR } from '../../../services/provedores/ProvedorService';

const ModalCamposRelacionados = (props) => {
    const [search, setSearch] = React.useState("");
    const [modal, setModal] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [selectedCampos, setSelectedCampos] = React.useState([]);

    const toggleModal = () => setModal(!modal);

    const toList = (event) => {
        if (event.target.checked) {
            setSelectedCampos(selectedCampos => [...selectedCampos, {id: Number(event.target.id)}]);
        } else {
            setSelectedCampos(selectedCampos.filter(item => item.id !== Number(event.target.id)));
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        let { url, options } = GET_ALL_CAMPOS_SEARCH({ value: search.toUpperCase() });
        let response = await fetch(url, options);
        let json = await response.json();
        setData(json);
    }

    const handleSubmit = async () => {
        let { url, options } = ADD_CAMPOS_AO_PROVEDOR({ id: props.idProvedor, campos_aplicados: selectedCampos });
        let response = await fetch(url, options);
        if (response.status === 200) {
            alert("Relacionados com sucesso!");
            toggleModal();
        }
    }

    React.useEffect(() => {
        async function allCampos() {
            let { url } = GET_ALL_CAMPOS();
            let response = await fetch(url);
            let json = await response.json();
            setData(json);
        };
        allCampos();

        async function loadSelectedCampos(){
            let url = GET_PROVEDOR(props.idProvedor).url;
            let response = await fetch(url);
            let json = await response.json();
            let array = [];
            json.campos.forEach((x) => {
                array.push({id: x.id});
            });
            setSelectedCampos(array);
        }
        loadSelectedCampos();
    }, [modal, props.idProvedor]);


    return (
        <>
            <button className='btn btn-primary' onClick={toggleModal}>Campos Relacionados</button>
            {
                modal &&
                <AbstractModal modalTitle="Relacione os campos ao provedor" isOpen={modal} openModal={toggleModal} onSave={handleSubmit}>
                    {
                        data &&
                        <>
                            <div className='table'>
                                <div className="table-controllers">
                                    <form onSubmit={handleSearch}>
                                        <label>Pesquisar</label>
                                        <input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                    </form>
                                </div>
                                <div className='table-head'>
                                    <div className='table-head-row'>
                                        <div className='table-cell'>
                                            <span>id</span>
                                        </div>
                                        <div className='table-cell'>
                                            <span>Campo</span>
                                        </div>
                                        <div className='table-cell'>
                                            <span>Selecione</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='table-body'>
                                    {
                                        data.map((item, index) => {
                                            return (
                                                <div className='table-row' key={index} >
                                                    <div className='table-cell'>
                                                        <span>{item.id}</span>
                                                    </div>
                                                    <div className='table-cell'>
                                                        <span>{item.campo}</span>
                                                    </div>
                                                    <div className='table-cell'>
                                                        {
                                                            selectedCampos.some(material => material.id === item.id) ?
                                                                <><span><input type="checkbox" onClick={toList} id={item.id} defaultChecked={true} /></span></>
                                                                :
                                                                <><span><input type="checkbox" onClick={toList} id={item.id} /></span></>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    }
                </AbstractModal>
            }
        </>
    )
}

export default ModalCamposRelacionados;