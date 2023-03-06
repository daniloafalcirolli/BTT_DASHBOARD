import React from 'react'
import ObjectList from '../../components/GenericList/ObjectList';
import usePagination from '../../hooks/usePagination';
import StatusFuncionarioService from '../../services/funcionario/StatusFuncionarioService';

const ListStatus = () => {
    const [data, setData] = React.useState({});
	const [responseTable, setResponseTable] = React.useState([]);
	const pagination = usePagination();

    const handleDelete = (event) => {
        StatusFuncionarioService.deleteStatus(event.currentTarget.id)
        .then((resp) => {
            if(resp.status == 200){
                window.alert("Excluido com sucesso");
                getAll();
            }
        });
    }

	const getAll = async () => {
        StatusFuncionarioService.getAll(pagination)
        .then((resp) => {
            setData(resp);
        });
	}
    
	const cabecalho = [
		{
			column: "Código"
		},
		{
			column: "Abreviatura"
		},
		{
			column: "Descrição"
		},
        {
            column: "Excluir",
            tipo: "delete",
            funcao: handleDelete
        }
	];

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
                    codigo: x.codigo,
                    abreviatura: x.abreviatura,
					descricao: x.descricao,
                    id: x.id
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
				addNewEnabled={true}
				objectHeader={cabecalho}
				objectArray={responseTable}
				objectPagination={pagination}
				redirect={false}
			/>
		</>
	);
}

export default ListStatus;