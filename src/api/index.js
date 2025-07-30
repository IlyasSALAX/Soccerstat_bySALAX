import axios from 'axios'

const api = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'applicattion/json',
    'X-Auth-Token': '1f48828db2db4e7f8b8cd2b95ce6f4b8',
  },
})

export default api
