import { API_URL } from "../../config";

class BaseService {
	async getAll(pagination){
		const body = await fetch(`${API_URL}/api/bases/page?page=${pagination.page}&size=${pagination.size}&value=${pagination.search}`)
		const json = await body.json();
		return json;
	}

	async getById(id){
		const body = await fetch(`${API_URL}/api/bases/${id}`)
		const json = await body.json();
		return json;
	}

	async insert(base){
		const config = {
			method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(base)
		}
		const body = await fetch(`${API_URL}/api/bases`, config);
		return body;
	}
	

	async edit(base){
		const config = {
			method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(base)
		}
		const body = await fetch(`${API_URL}/api/bases`, config);
		return body;
	}
	

	async delete(id){
		const config = {
			method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
		}
		const body = await fetch(`${API_URL}/api/bases/${id}`, config);
		return body;
	}
}

export default new BaseService();