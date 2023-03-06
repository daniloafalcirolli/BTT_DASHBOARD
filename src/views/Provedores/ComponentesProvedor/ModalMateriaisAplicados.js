import React from 'react'
import AbstractModal from '../../../components/Modal/AbstractModal';
import { ADD_MATERIAIS_APLICADOS_AO_PROVEDOR, GET_ALL_MATERIAIS_APLICADOS, GET_ALL_MATERIAIS_APLICADOS_SEARCH, GET_PROVEDOR } from '../../../services/provedores/ProvedorService';

const ModalMateriaisAplicados = (props) => {
    const [search, setSearch] = React.useState("");
    const [modal, setModal] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [selectedMaterials, setSelectedMaterials] = React.useState([]);

    const toggleModal = () => setModal(!modal);

    const toList = (event) => {
        if (event.target.checked) {
            setSelectedMaterials(selectedMaterials => [...selectedMaterials, { id: Number(event.target.id) }]);
        } else {
            setSelectedMaterials(selectedMaterials.filter(item => item.id !== Number(event.target.id)));
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        let { url, options } = GET_ALL_MATERIAIS_APLICADOS_SEARCH({ value: search.toUpperCase() });
        let response = await fetch(url, options);
        let json = await response.json();
        setData(json);
    }

    const handleSubmit = async () => {
        let { url, options } = ADD_MATERIAIS_APLICADOS_AO_PROVEDOR({ id: props.idProvedor, materiais_aplicados: selectedMaterials });
        let response = await fetch(url, options);
        if (response.status === 200) {
            alert("Relacionados com sucesso!");
            toggleModal();
        }
    }

    React.useEffect(() => {
        async function allMateriaisAplicados() {
            let { url } = GET_ALL_MATERIAIS_APLICADOS();
            let response = await fetch(url);
            let json = await response.json();
            setData(json);
        }
        allMateriaisAplicados();

        async function loadSelectedMateriais() {
            let url = GET_PROVEDOR(props.idProvedor).url;
            let response = await fetch(url);
            let json = await response.json();
            let array = [];
            json.materiais_aplicados.forEach((x) => {
                array.push({id: x.id});
            });
            setSelectedMaterials(array);
        }
        loadSelectedMateriais();
    }, [modal, props.idProvedor]);

    return (
        <>
            <button className='btn btn-primary' onClick={toggleModal}>Materiais Aplicados</button>
            {
                modal &&
                <AbstractModal modalTitle="Relacione os materiais aplicados ao provedor" isOpen={modal} openModal={toggleModal} onSave={handleSubmit}>
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
                                            <span>Material</span>
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
                                                        <span>{item.material}</span>
                                                    </div>
                                                    <div className='table-cell'>
                                                        {
                                                            selectedMaterials.some((x) => x.id === item.id) ?
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

export default ModalMateriaisAplicados;