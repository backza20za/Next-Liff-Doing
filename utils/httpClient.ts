import axios from 'axios'

const httpClient = axios.create({
    baseURL: "https://next-liff-app.herokuapp.com/api"
})

export default httpClient
