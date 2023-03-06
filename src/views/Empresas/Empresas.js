import React from 'react'
import ObjectList from '../../components/GenericList/ObjectList';
import { API_URL } from '../../config';
import usePagination from '../../hooks/usePagination';

const Empresas = () => {
	const [data, setData] = React.useState({});
	const [responseTable, setResponseTable] = React.useState([]);
	const pagination = usePagination();

	const cabecalho = [
		{
			column: "Razão social"
		},
		{
			column: "Unidade"
		}
	];

	const getAll = async () => {
		let response = await fetch(`${API_URL}/api/empresa/page?size=${pagination.size}&page=${pagination.page}&value=${pagination.search}`);
		let json = await response.json();
		setData(json);
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
                    razao_social: x.razao_social,
                    unidade: x.nome,
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
				redirect={false}
			/>
		</>
	)
}

export default Empresas;