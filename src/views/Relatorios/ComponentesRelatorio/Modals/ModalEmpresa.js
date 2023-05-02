import React from 'react'
import { API_URL } from '../../../../config';
import modalStyles from '../Styles/Modal.module.css'
import useForm from '../../../../hooks/useForm';
import AbstractModal from '../../../../components/Modal/AbstractModal';
import Input from '../../../../components/Input/Input';

const ModalEmpresa = (props) => {
	const search  = useForm();
	const [modal, setModal] = React.useState(false);
	const [data, setData] = React.useState([]);

	const toggleModal = () => setModal(!modal);

	const selectEmpresa = (event) => {
		props.empresa(data.find((item) => item.nome === event.currentTarget.id));
		toggleModal();
	}

	const getEmpresas = async () => {
		let url = API_URL + `/api/empresa/modal`;
		let response = await fetch(url);
		let json = await response.json();
		setData(json);
	}

	const handleSearch = async (event) => {
		event.preventDefault();
		getEmpresas();
	}

	React.useEffect(() => {
		getEmpresas();
	}, [])

	return (
		<>
			<button className={`${modalStyles.button_height} btn btn-primary w-100`} onClick={toggleModal}>Selecione a empresa</button>
			{
				<AbstractModal modalTitle="Selecione a empresa" isOpen={modal} openModal={toggleModal}>
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
											<span>Empresa</span>
										</div>
									</div>
								</div>
								<div className={`table-body ${modalStyles.body_func}`}>
									{
										data.map((item, index) => {
											return (
												<div className={`table-row clickable ${modalStyles.table_row}`} key={index} onClick={selectEmpresa} id={item.nome}>
													<div className={`table-cell ${modalStyles.table_cell}`}>
														<span>{item.razao_social}</span>
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

export default ModalEmpresa