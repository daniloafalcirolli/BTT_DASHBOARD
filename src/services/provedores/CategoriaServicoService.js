import { API_URL } from "../../config";

class CategoriaServicoService {
	async getAll(pagination){
		const body = await fetch(`${API_URL}/api/categoria/servico/provedor/page?page=${pagination.page}&size=${pagination.size}&value=${pagination.search}`)
		const json = await body.json();
		return json;
	}

	async getById(id){
		const body = await fetch(`${API_URL}/api/categoria/servico/provedor/${id}`)
		const json = await body.json();
		return json;
	}

	async insert(categoria){
        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        }
        const body = await fetch(`${API_URL}/api/categoria/servico/provedor`, config);
        return body;
    }

	async edit(categoria){
        const config = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        }
        const body = await fetch(`${API_URL}/api/categoria/servico/provedor`, config);
        return body;
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

export default new CategoriaServicoService();