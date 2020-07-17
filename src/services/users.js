import axios from "axios"
const baseUrl = "/api/users"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const clearToken = () => {
  token = null
}

const create = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const update = async (id, updatedUser) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedUser, config)
  return response.data
}

const deleteUser = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export default { create, update, setToken, clearToken, deleteUser }
