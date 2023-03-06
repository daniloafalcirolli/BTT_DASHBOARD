import React from 'react'
import ObjectList from '../../components/GenericList/ObjectList';
import usePagination from '../../hooks/usePagination';
import ParametrizacaoService from '../../services/parametrizacoes/ParametrizacaoService';

const ListParametrizacoes = () => {
	const [data, setData] = React.useState({});
	const [responseTable, setResponseTable] = React.useState([]);
	const pagination = usePagination();

    const handleDelete = (event) => {
        ParametrizacaoService.delete(event.currentTarget.id)
        .then((resp) => {
            if(resp.status == 200){
                window.alert("Excluido com sucesso");
                getAll();
            }
        });
    }

	const getAll = async () => {
        ParametrizacaoService.getAll(pagination)
        .then((resp) => {
            setData(resp);
        });
	}
    
	const cabecalho = [
		{
			column: "id"
		},
		{
			column: "Nome"
		},
		{
			column: "Endereço"
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
					id: x.id,
                    meta_key: x.metaKey,
                    meta_value: x.metaValue,
                    id_exclude: x.id_exclude
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
				redirect={true}
			/>
		</>
	);
}

export default ListParametrizacoes;