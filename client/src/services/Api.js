import axios from 'axios';

const _URL = 'http://localhost:5000/api';

class Api {

    fetchProduits() {
        return axios.get(_URL);
    }

    fetchProduitById(id) {
        return axios.get(`${_URL}/${id}/edit`);
    }

    deleteProduit(id) {
        return axios.delete(`${_URL}/${id}`);
    }

    addProduit(produit) {
        return axios.post(_URL, produit);
    }

    editProduit(produit) {
        return axios.put(`${_URL}/${produit.id}`, produit);
    }

    login(user) {
        return axios.post(`${_URL}/login`, user);
    }

    isAuth() {
        return localStorage.getItem("token") !== null;
    }

    logout() {
        localStorage.clear();
    }

}

export default new Api();