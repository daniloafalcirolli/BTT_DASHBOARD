import React from 'react'
import Input from '../../../../components/Input/Input';
import AbstractModal from '../../../../components/Modal/AbstractModal'
import { API_URL } from '../../../../config';
import useForm from '../../../../hooks/useForm';
import modalStyles from '../Styles/Modal.module.css'

const ModalProvedor = (props) => {
	const search = useForm();
	const [modal, setModal] = React.useState(false);
	const [data, setData] = React.useState([]);

	const toggleModal = () => setModal(!modal);

	const handleSearch = async (event) => {
		event.preventDefault();
		getProvedores();
	}

	const selectProvedor = (event) => {
		props.provedor({ id: event.currentTarget.id, name: data.find((item) => item.id === Number(event.currentTarget.id)).name });
		toggleModal();
	}

	const getProvedores = async () => {
		let url = API_URL + `/api/provedor?value=${search.value.toUpperCase()}`;
		let response = await fetch(url);
		let json = await response.json();
		setData(json);
	}

	React.useEffect(() => {
		getProvedores();
	}, [modal])

	return (
		<>
			<button className={`${modalStyles.button_height} btn btn-primary w-100`} onClick={toggleModal}>Selecione o provedor</button>
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
											<span>Nome</span>
										</div>
									</div>
								</div>
								<div className={`table-body ${modalStyles.body_func}`}>
									{
										data.map((item, index) => {
											return (
												<div className={`table-row clickable ${modalStyles.table_row}`} key={index} onClick={selectProvedor} id={item.id}>
													<div className={`table-cell ${modalStyles.table_cell}`}>
														<span>{item.name}</span>
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

export default ModalProvedor