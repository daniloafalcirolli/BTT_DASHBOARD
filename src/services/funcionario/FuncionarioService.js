import { API_URL } from "../../config"

export function GET_FUNCIONARIO_BY_CPF(cpf) {
    return {
        url: API_URL + "/api/funcionario/" + cpf
    }
}

export function EDIT_AND_SAVE_FUNCIONARIO(body) {
    return {
        url: API_URL + "/api/funcionario",
        options: {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function RECALCULO_CONSUMO(body) {
    return {
        url: API_URL + "/api/rotas/recalculo/consumo",
        options: {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function RECALCULO_VALOR_COMBUSTIVEL(body){
    return {
        url: API_URL + "/api/rotas/recalculo/combustivel",
        options: {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function RESET_PASSWORD(body){
    return {
        url: API_URL + "/api/funcionario/register/password",
        options: {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}


export function ADD_STATUS(body) {
    return {
        url: API_URL + "/api/status/func",
        options: {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function DELETE_STATUS(id){
    return {
        url: API_URL + "/api/status/func/" + id,
        options: {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
}

class FuncionarioService {
    async getAll(pagination){
		const body = await fetch(`${API_URL}/api/funcionario/page?page=${pagination.page}&size=${pagination.size}&value=${pagination.search}`)
		const json = await body.json();
		return json;
	}

}

export default new FuncionarioService();