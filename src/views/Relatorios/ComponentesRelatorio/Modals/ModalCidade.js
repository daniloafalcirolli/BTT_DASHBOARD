import React from 'react'
import { API_URL } from '../../../../config';
import modalStyles from '../Styles/Modal.module.css'
import useForm from '../../../../hooks/useForm';
import AbstractModal from '../../../../components/Modal/AbstractModal';
import Input from '../../../../components/Input/Input';

const ModalCidade = (props) => {
	const search  = useForm();
	const [modal, setModal] = React.useState(false);
	const [data, setData] = React.useState([]);

	const toggleModal = () => setModal(!modal);

	const selectCidade = (event) => {
		props.cidade({ id: event.currentTarget.id, cidade: data.find((item) => item.id === Number(event.currentTarget.id)).cidade });
		toggleModal();
	}

	const getCidades = async () => {
		let url = API_URL + `/api/cidade?value=${search.value.toUpperCase()}`;
		let response = await fetch(url);
		let json = await response.json();
		setData(json);
	}

	const handleSearch = async (event) => {
		event.preventDefault();
		getCidades();
	}

	React.useEffect(() => {
		getCidades();
	}, [])

	return (
		<>
			<button className={`${modalStyles.button_height} btn btn-primary w-100`} onClick={toggleModal}>Selecione a cidade</button>
			{
				<AbstractModal modalTitle="Relacione os campos ao provedor" isOpen={modal} openModal={toggleModal}>
					{
						data &&
						<>
							<div className='table'>
								<div className="table-controllers">
									<form onSubmit={handleSearch}>
										<Input type="text" label="Pesquisar" id="search" name="search" {...search}/>
									</form>
								</div>
								<div className='table-head'>
									<div className='table-head-row head-func'>
										<div className={`table-cell ${modalStyles.table_cell}`}>
											<span>Cidade</span>
										</div>
										<div className={`table-cell ${modalStyles.table_cell}`}>
											<span>Preço</span>
										</div>
									</div>
								</div>
								<div className={`table-body ${modalStyles.body_func}`}>
									{
										data.map((item, index) => {
											return (
												<div className={`table-row clickable ${modalStyles.table_row}`} key={index} onClick={selectCidade} id={item.id}>
													<div className={`table-cell ${modalStyles.table_cell}`}>
														<span>{item.cidade}</span>
													</div>
													<div className={`table-cell ${modalStyles.table_cell}`}>
														<span>R$ {Number(item.preco_gasolina).toFixed(2)}</span>
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

export default ModalCidade