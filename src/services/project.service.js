import axios from '../utils/axios'

export function getProjectsService() {
    return axios.get("/projects");
}

export function getProjectByIdService(id) {
    return axios.get(`/project/${id}`);
}

export function getMyConfirmedProjectsService(id) {
    return axios.get(`/confirmedProject/${id}`);
}

export function getMyCreatedProjectsService(id) {
    return axios.get(`/createdProject/${id}`);
}

export function getUnconfirmedProjectsService() {
    return axios.get("/unconfirm-projects");
}

export function confirmedProjectService(form) {
    return axios.post("/unconfirm-projects",{
        ...form,
    });
}

export function getConfirmedProjectsService() {
    return axios.get("/confirm-projects");
}

export function createNewProjectService(form) {
    return axios.post("/projects", {
        ...form
    });
}

export function getDonateProjectsService() {
    return axios.get("/donate-projects");
}

