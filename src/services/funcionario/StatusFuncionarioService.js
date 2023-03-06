import { API_URL } from "../../config";

class StatusFuncService {
	async getAll(pagination){
		const body = await fetch(`${API_URL}/api/status/func/page?page=${pagination.page}&size=${pagination.size}&value=${pagination.search}`)
		const json = await body.json();
		return json;
	}

	async deleteStatus(id){
		const config = {
			method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
		}
		const body = await fetch(`${API_URL}/api/status/func/${id}`, config);
		return body;
	}
}

export default new StatusFuncService();