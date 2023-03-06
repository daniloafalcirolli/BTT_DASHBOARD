import { API_URL } from "../../config";

class CidadesService{
    async getAll(pagination){
		const body = await fetch(`${API_URL}/api/cidade/page?page=${pagination.page}&size=${pagination.size}&value=${pagination.search}`)
		const json = await body.json();
		return json;
	}

    async getById(id){
        const body = await fetch(`${API_URL}/api/cidade/${id}`)
		const json = await body.json();
		return json;
    }

    async insert(cidade){
        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cidade)
        }
        const body = await fetch(`${API_URL}/api/cidade`, config);
        return body;
    }

    async edit(cidade){
        const config = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cidade)
        }
        const body = await fetch(`${API_URL}/api/cidade`, config);
        return body;
    }

    async delete(id){
        const config = {
			method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
		}
		const body = await fetch(`${API_URL}/api/cidade/${id}`, config);
        return body;
    }
}

export default new CidadesService();