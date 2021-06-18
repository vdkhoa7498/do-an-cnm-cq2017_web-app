import axios from '../utils/axios'

export function getProjectsService() {
    return axios.get("/projects");
}

export function createNewProjectService(form) {
    return axios.post("/projects", {
        ...form
    });
}