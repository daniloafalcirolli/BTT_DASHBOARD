import React from 'react'
import ObjectList from '../../components/GenericList/ObjectList';
import usePagination from '../../hooks/usePagination';
import FuncionarioService from '../../services/funcionario/FuncionarioService';

const ListFuncionarios = () => {
	const [data, setData] = React.useState({});
	const [responseTable, setResponseTable] = React.useState([]);
	const pagination = usePagination();

	const cabecalho = [
		{
			column: "cpf_redirect",
			oculto: true
		},
		{
			column: "Funcionário"
		},
		{
			column: "Username"
		},
		{
			column: "cpf"
		},
		{
			column: "rg"
		},
		{
			column: "Telefone"
		}
	];

	const getAll = async () => {
		FuncionarioService.getAll(pagination)
		.then((resp) => {
			setData(resp);
		})
	}

	React.useEffect(() => {
        let array = {};
        array.number = data.number;
        array.last = data.last;
        array.first = data.first;
        array.totalPages = data.totalPages;
        if(data.content != undefined && data.content.length > 0) {
            array.content = [];
            data.content.forEach((x) => {
                array.content.push({
                    id: x.cpf,
                    nome: x.nome,
					username: x.username,
					cpf: x.cpf,
					rg: x.rg,
					telefone: x.telefone
                });
            });
            setResponseTable(array);
        };
    }, [data]);
	
	React.useEffect(() => {
		getAll();
	}, [pagination.page, pagination.size, pagination.search]);

	return (
		<>
			<ObjectList 
				searchEnabled={true}
				addNewEnabled={false}
				objectHeader={cabecalho}
				objectArray={responseTable}
				objectPagination={pagination}
				redirect={true}
			/>
		</>
	);
}

export default ListFuncionarios