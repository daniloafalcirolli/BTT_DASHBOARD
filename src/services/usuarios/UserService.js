import { API_URL } from "../../config";

class UserService {
	async getAll(pagination){
		const body = await fetch(`${API_URL}/api/master/user/page?page=${pagination.page}&size=${pagination.size}&value=${pagination.search}`)
		const json = await body.json();
		return json;
    }

	async getById(id){
        const body = await fetch(`${API_URL}/api/master/user/${id}`)
		const json = await body.json();
		return json;
    }

	async insert(user){
		const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        const body = await fetch(`${API_URL}/api/master/user`, config);
        return body;
	}

	async edit(user){
        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        const body = await fetch(`${API_URL}/api/master/user`, config);
        return body;
    }

	async delete(id){
		const config = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = await fetch(`${API_URL}/api/master/user/${id}`, config);
        return body;
	}
}

export default new UserService();