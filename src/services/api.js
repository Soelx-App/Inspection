import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://192.168.0.189/api/',
    baseURL: 'http://omni-homologacao.jvssistemas.inf.br:8185/api/'
});

export default api;