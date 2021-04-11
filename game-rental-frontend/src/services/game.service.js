import http from '../http-common';

class GameService {
    getAll() {
        return http.get("/games");
    }
    
    get(id) {
        return http.get(`/games/${id}`);
    }
    
    create(data) {
        return http.post("/games", data);
    }
}

export default new GameService();