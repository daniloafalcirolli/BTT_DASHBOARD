import { API_URL } from "../../config"

export function ADD_PROVEDOR(body) {
    return {
        url: API_URL + "/api/provedor",
        options: {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function GET_PROVEDOR(id){
    return {
        url: API_URL + `/api/provedor/${id}`
    }
}

export function EDIT_PROVEDOR(body){
    return {
        url: API_URL + `/api/provedor`,
        options: {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function GET_ALL_SERVICOS_PROVEDOR_SEARCH(body){
    return {
        url: API_URL + `/api/provedor/servico/search`,
        options: {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function ADD_SERVICO_PROVEDOR(body){
    return {
        url: API_URL + `/api/provedor/servico/add`,
        options: {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function EDIT_SERVICO_PROVEDOR(body){
    return {
        url: API_URL + `/api/provedor/servico/edit`,
        options: {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function DELETE_SERVICO_PROVEDOR(id_provedor, id_servico){
    return {
        url: API_URL + `/api/provedor/${id_provedor}/${id_servico}`,
        options:{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        }
    }
}

export function GET_ALL_MATERIAIS_RETIRADOS(){
    return {
        url: API_URL + `/api/material/retirado`
    }
}

export function GET_ALL_MATERIAIS_RETIRADOS_SEARCH(body){
    return {
        url: API_URL + `/api/material/retirado/all/search`,
        options: {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function ADD_MATERIAIS_RETIRADOS_AO_PROVEDOR(body){
    return {
        url: API_URL + `/api/provedor/materiais/retirados`,
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function GET_ALL_MATERIAIS_APLICADOS(){
    return {
        url: API_URL + `/api/material/aplicado`
    }
}

export function GET_ALL_MATERIAIS_APLICADOS_SEARCH(body){
    return {
        url: API_URL + `/api/material/aplicado/all/search`,
        options: {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function ADD_MATERIAIS_APLICADOS_AO_PROVEDOR(body){
    return {
        url: API_URL + `/api/provedor/materiais/aplicados`,
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function GET_ALL_CAMPOS(){
    return {
        url: API_URL + `/api/campos/provedor`
    }
}


export function GET_ALL_CAMPOS_SEARCH(body){
    return {
        url: API_URL + `/api/campos/provedor/all/search`,
        options: {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}


export function ADD_CAMPOS_AO_PROVEDOR(body){
    return {
        url: API_URL + `/api/provedor/campos`,
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function ADD_FOTOS_AO_PROVEDOR(body){
    return {
        url: API_URL + `/api/provedor/imagens`,
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function GET_ALL_IMAGENS(){
    return {
        url: API_URL + `/api/fotos/provedor`
    }
}

export function GET_IMAGENS_SEARCH(body){
    return {
        url: API_URL + `/api/fotos/provedor/all`,
        options: {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

class ProvedorService {
    async getAll(pagination){
		const body = await fetch(`${API_URL}/api/provedor/page?page=${pagination.page}&size=${pagination.size}&value=${pagination.search}`)
		const json = await body.json();
		return json;
	}

	async delete(id){
        const config = {
			method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
		}
		const body = await fetch(`${API_URL}/api/categoria/servico/provedor/${id}`, config);
        return body;
    }
}

export default new ProvedorService();