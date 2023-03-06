import React from 'react'
import ObjectList from '../../components/GenericList/ObjectList'
import usePagination from '../../hooks/usePagination';

const Configurações = () => {
    const [data, setData] = React.useState({});
    const [responseTable, setResponseTable] = React.useState([]);
    const pagination = usePagination();

    const cabecalho = [
        {
            column: "redirect",
            oculto: true
        },
        {
            column: "Nome"
        },
        {
            column: "CPF"
        },
        {
            column: "Username"
        }
    ];

    const getAll = async () => {
        fetch("http://ip.b2ttelecomunicacoes.com.br:22309/api/funcionario/page?value=" + pagination.search + "&size=" + pagination.size + "&page=" + pagination.page).then(resp => {
            return resp.json();
        }).then(response => {
            setData(response);
        });
    }

    React.useEffect(() => {
        getAll();
    }, [pagination.size, pagination.page, pagination.search]);

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
                    cpf: x.cpf,
                    username: x.username,
                });
            });
            setResponseTable(array);
        }
    }, [data]);

    return (
        <div>
            <ObjectList 
                searchEnabled={true}
                addNewEnabled={true}
                objectHeader={cabecalho}
                objectArray={responseTable}
                objectPagination={pagination}
                redirect={true}
            />
        </div>
    )
}

export default Configurações