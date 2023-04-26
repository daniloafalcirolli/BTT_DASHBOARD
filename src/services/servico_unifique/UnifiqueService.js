import { API_URL } from "../../config";

export function GET_SERVICES_UNIFIQUE(body){
    return {
        url: API_URL + "/api/servico/unifique",
        options: {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        }
    }
}