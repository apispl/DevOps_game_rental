import http from '../http-common';

class GameService {
    getAll() {
        return http.get("/games");
    }
    
    get(id) {
        // return http.get(`/games/${id}`);
        return fetch(`/api/games/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response =>  response.json());
    }
    
    create(data) {
        // return http.post("/games", data);
        return fetch('/api/games', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                title: data.title,
                publishDate: data.publishDate,
                manufacturer: data.manufacturer
            })
        })
    }

    update(id, data) {
        // return http.put(`/games/${id}`, data);
        return fetch(`/api/games/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.id,
                title: data.title,
                publishDate: data.publishDate,
                manufacturer: data.manufacturer
            })
        })
    }
    
    delete(id) {
        // return http.delete(`/games/${id}`);
        return fetch(`/api/games/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

export default new GameService();