import React from 'react'
import { useParams } from 'react-router-dom';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/useForm';
import CategoriaServicoService from '../../services/provedores/CategoriaServicoService';

const EditCategoria = () => {
    const categoria = useForm();
    const params = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        CategoriaServicoService.edit({ id: params.id, categoria: categoria.value })
        .then((resp) => {
            if (resp.status === 200) {
                alert("Editado com sucesso!");
            }
        });
    }

    const getById = async () => {
        CategoriaServicoService.getById(params.id)
        .then((resp) => {
            categoria.setValue(resp.categoria);
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
                        <Input type="text" label="Categoria" id="categoria" name="categoria" {...categoria} />
                        <button className="btn btn-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditCategoria