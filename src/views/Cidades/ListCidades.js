import React from 'react'
import ObjectList from '../../components/GenericList/ObjectList';
import usePagination from '../../hooks/usePagination';
import CidadesService from '../../services/cidades/CidadesService';

const ListCidades = () => {
	const [data, setData] = React.useState({});
	const [responseTable, setResponseTable] = React.useState([]);
	const pagination = usePagination();

    const handleDelete = (event) => {
        CidadesService.delete(event.currentTarget.id)
        .then((resp) => {
            if(resp.status == 200){
                window.alert("Excluido com sucesso");
                getAll();
            }
        });
    }

	const getAll = async () => {
        CidadesService.getAll(pagination)
        .then((resp) => {
            setData(resp);
        });
	}
    
	const cabecalho = [
		{
			column: "id",
			oculto: true
		},
		{
			column: "Cidade"
		},
		{
			column: "Preço da gasolina"
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
					id_redirect: x.id,
                    cidade: x.cidade,
                    preco_gasolina: x.preco_gasolina,
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
				redirect={true}
			/>
		</>
	);
}

export default ListCidades;