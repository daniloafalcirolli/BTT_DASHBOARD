import { API_URL } from "../../config";

export function SEARCH_ROTAS_DATE(body){
    return {
        url: API_URL + "/api/rotas/individual",
        options: {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}