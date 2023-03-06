import { API_URL } from "../../config";

class ParametrizacaoService {
	async getAll(pagination){
		const body = await fetch(`${API_URL}/api/meta/page?page=${pagination.page}&size=${pagination.size}&value=${pagination.search}`)
		const json = await body.json();
		return json;
	}

	async getById(id){
		const body = await fetch(`${API_URL}/api/meta/${id}`)
		const json = await body.json();
		return json;
	}

	async insert(parametro){
		const config = {
			method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(parametro)
		}
		const body = await fetch(`${API_URL}/api/meta`, config);
		return body;
	}
	

	async edit(parametro){
		const config = {
			method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(parametro)
		}
		const body = await fetch(`${API_URL}/api/meta`, config);
		return body;
	}
	

	async delete(id){
		const config = {
			method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
		}
		const body = await fetch(`${API_URL}/api/meta/${id}`, config);
		return body;
	}
}

export default new ParametrizacaoService();