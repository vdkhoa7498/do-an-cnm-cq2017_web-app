import axios from '../utils/axios'

export function loginService({publicKey, privateKey}) {
    return axios.post("/login", {
        publicKey,
        privateKey,
    });
  }

export function registerService({email, name}) {
    return axios.post("/register", {
        email, 
        name,
    });
}