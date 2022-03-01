import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-cfcff/us-central1/api' // the url of the api (cloud function)
});

export default instance;