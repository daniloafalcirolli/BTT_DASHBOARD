import { API_URL } from "./config"

export function GET_SERVICO(id){
    return {
        url: API_URL + "/api/servico/" + id
    }
}

export function GET_SERVICOS_INTERVAL(body){
    return {
        url: API_URL + "/api/servico/filter",
        options: {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function GET_ALL_CATEGORIA_SERVICO(id){
    return {
        url: API_URL + `/api/categoria/servico/provedor`,
    }
}

export function EDIT_FUNCIONARIO_SERVICO(body){
    return {
        url: API_URL + "/api/servico/edit",
        options: {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}
