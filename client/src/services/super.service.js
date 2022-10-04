import axios from "axios";

const API_URL = "http://localhost:8080/api/super";
const API_Super = "http://localhost:8080/api/super/";
const API_ByUsername = "http://localhost:8080/api/super?username=";

class DataUserService {
  getAll(params) {
    return axios.get(API_URL, {params});
  }

  get(id) {
    return axios.get(API_Super + id);
  }

  create(data) {
    return axios.post(API_URL, data);
  }

  update(id, data) {
    return axios.put(API_Super + id, data);
  }

  delete(id) {
    return axios.delete(API_Super + id);
  }

  findByUsername(username) {
    return axios.get(API_ByUsername + username);
  }
}

export default new DataUserService();