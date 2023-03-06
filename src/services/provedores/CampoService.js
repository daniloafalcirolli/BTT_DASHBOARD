import { API_URL } from "../../config";

class CampoService {
	async getAll(pagination){
		const body = await fetch(`${API_URL}/api/campos/provedor/page?page=${pagination.page}&size=${pagination.size}&value=${pagination.search}`)
		const json = await body.json();
		return json;
	}

	async getById(id){
		const body = await fetch(`${API_URL}/api/campos/provedor/${id}`)
		const json = await body.json();
		return json;
	}

	async insert(campo){
        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campo)
        }
        const body = await fetch(`${API_URL}/api/campos/provedor`, config);
        return body;
    }

	async edit(campo){
        const config = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campo)
        }
        const body = await fetch(`${API_URL}/api/campos/provedor`, config);
        return body;
    }

	async delete(id){
        const config = {
			method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
		}
		const body = await fetch(`${API_URL}/api/campos/provedor/${id}`, config);
        return body;
    }
}

export default new CampoService();