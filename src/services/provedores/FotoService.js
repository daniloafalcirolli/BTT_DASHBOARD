import { API_URL } from "../../config";

class FotoService {
	async getAll(pagination){
		const body = await fetch(`${API_URL}/api/fotos/provedor/page?page=${pagination.page}&size=${pagination.size}&value=${pagination.search}`)
		const json = await body.json();
		return json;
	}

	async getById(id){
		const body = await fetch(`${API_URL}/api/fotos/provedor/${id}`)
		const json = await body.json();
		return json;
	}

	async insert(foto){
		const config = {
			method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(foto)
		}
		const body = await fetch(`${API_URL}/api/fotos/provedor`, config);
		return body;
	}

	async edit(foto){
		const config = {
			method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(foto)
		}
		const body = await fetch(`${API_URL}/api/fotos/provedor`, config);
		return body;
	}
	
	async delete(id){
		const config = {
			method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
		}
		const body = await fetch(`${API_URL}/api/fotos/provedor/${id}`, config);
		return body;
	}
}

export default new FotoService();