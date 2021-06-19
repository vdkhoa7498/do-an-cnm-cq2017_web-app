import axios from '../utils/axios'

export function getProjectsService() {
    return axios.get("/projects");
}

export function createNewProjectService(form) {
    return axios.post("/projects", {
        ...form
    });
}

export function getDonateProjectsService() {
    return axios.get("/donate-projects");
}

export function donateProjectService(form) {
    return axios.post("/donate-projects", {
        ...form
    });
}