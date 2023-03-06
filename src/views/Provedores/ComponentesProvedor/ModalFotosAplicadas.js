import React from 'react'
import AbstractModal from '../../../components/Modal/AbstractModal';
import { ADD_FOTOS_AO_PROVEDOR, GET_ALL_IMAGENS, GET_IMAGENS_SEARCH, GET_PROVEDOR } from '../../../services/provedores/ProvedorService';

const ModalFotosAplicadas = ( props ) => {
	const [modal, setModal] = React.useState(false);
	const [search, setSearch] = React.useState("");
	const [data, setData] = React.useState([]);
    const [selectedImagens, setSelectedImagens] = React.useState([]);

	const toggleModal = () => setModal(!modal);

	const toList = (event) => {
        if (event.target.checked) {
            setSelectedImagens(selectedImagens => [...selectedImagens, {id: Number(event.target.id)}]);
        } else {
            setSelectedImagens(selectedImagens.filter(item => item.id !== Number(event.target.id)));
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        let { url, options } = GET_IMAGENS_SEARCH({ value: search.toUpperCase() });
        let response = await fetch(url, options);
        let json = await response.json();
        setData(json);
		loadSelectedImagens();
    }

	const handleSubmit = async () => {
		let { url, options } = ADD_FOTOS_AO_PROVEDOR({id: props.idProvedor, imagens: selectedImagens})
		let response = await fetch(url, options);
		if(response.status === 200){
			alert("Relacionados com sucesso!");
			toggleModal();
		}
	};

	React.useEffect(() => {
		async function allImagens(){
			let { url } = GET_ALL_IMAGENS();
			let response = await fetch(url);
			let json = await response.json();
			setData(json);
		}
		allImagens();

		loadSelectedImagens();
	}, [props.idProvedor]);

	async function loadSelectedImagens(){
		let { url } = GET_PROVEDOR(props.idProvedor);
		let response = await fetch(url);
		let json = await response.json();
		let array = [];
		json.imagens.forEach((x) => {
			array.push({id: x.id});
		});
		setSelectedImagens(array);
	}

	return (
		<>
			<button className='btn btn-primary' onClick={toggleModal}>Fotos Relacionadas</button>
			{
				modal && 
				<AbstractModal modalTitle="Relacione as fotos ao provedor" isOpen={modal} openModal={toggleModal} onSave={handleSubmit}>
					{
						data &&
						<>
							<div className='table'>
								<div className='table-controller'>
									<form onSubmit={handleSearch}>
                                        <label>Pesquisar</label>
                                        <input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                    </form>
								</div>
								<div className='table-head'>
									<div className='table-head-row'>
										<div className='table-cell'>
											<span>Foto</span>
										</div>
										<div className='table-cell'>
											<span>Status serviço</span>
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
												<div className='table-row' key={index}>
													<div className='table-cell'>
                                                        <span>{item.name}</span>
                                                    </div>
                                                    <div className='table-cell'>
                                                        <span>{item.status_servico}</span>
                                                    </div>
													<div className='table-cell'>
                                                        {
                                                            selectedImagens.some(imagem => imagem.id === item.id) ?
                                                                <><span><input type="checkbox" onClick={toList} id={item.id} defaultChecked={true} /></span></>
                                                                :
                                                                <><span><input type="checkbox" onClick={toList} id={item.id} /></span></>
                                                        }
                                                    </div>
												</div>
											);
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

export default ModalFotosAplicadas