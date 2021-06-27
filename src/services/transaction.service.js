import axios from '../utils/axios'

export function donateProjectService(form) {
    return axios.post("/donate-projects", {
        ...form
    });
}

export function sendBackProjectService(form) {
    return axios.post("/sendback-projects", {
        ...form
    });
}

export function getAllDontateTransactions() {
    return axios.get(`donate-transactions`);
}
