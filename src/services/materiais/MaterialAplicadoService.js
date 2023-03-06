import { API_URL } from "../../config";

class MaterialAplicadoService {
    async getAll(pagination){
		const body = await fetch(`${API_URL}/api/material/aplicado/page?page=${pagination.page}&size=${pagination.size}&value=${pagination.search}`)
		const json = await body.json();
		return json;
    }

    async getById(id){
        const body = await fetch(`${API_URL}/api/material/aplicado/${id}`)
		const json = await body.json();
		return json;
    }

	async insert(material){
        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(material)
        }
        const body = await fetch(`${API_URL}/api/material/aplicado`, config);
        return body;
    }

	async edit(material){
        const config = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(material)
        }
        const body = await fetch(`${API_URL}/api/material/aplicado`, config);
        return body;
    }

    async alterSerial(id){
        const config = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = await fetch(`${API_URL}/api/material/aplicado/status/${id}`, config);
        return body;
    }
}

export default new MaterialAplicadoService();