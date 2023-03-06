import React from 'react'
import { useParams } from 'react-router-dom';
import { EDIT_PARAMETRO, GET_PARAMETRO } from '../../api';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/useForm';
import ParametrizacaoService from '../../services/parametrizacoes/ParametrizacaoService';

const EditParametro = () => {
	const meta_key = useForm();
	const meta_value = useForm();
	const description = useForm();
    const params = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        ParametrizacaoService.edit({id: params.id, metaKey: meta_key.value, metaValue: meta_value.value, description: description.value})
        .then((resp) => {
            if(resp.status === 200){
                alert("Editado com sucesso!");
            }
        });
    }

    const getById = async () => {
        ParametrizacaoService.getById(params.id)
        .then((resp) => {
            meta_key.setValue(resp.metaKey);
            meta_value.setValue(resp.metaValue);
			description.setValue(resp.description);
        });  
    }

	React.useEffect(() => {
        getById();
    }, [params])

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <Input type="text" label="Meta Key" id="meta_key" name="meta_key" {...meta_key} />
						<Input type="text" label="Meta Value" id="meta_value" name="meta_value" {...meta_value} />
                        <Input type="text" label="Descrição" id="description" name="description" {...description} />

                        <button className="btn btn-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditParametro