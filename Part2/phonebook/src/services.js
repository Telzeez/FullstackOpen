import axios from 'axios'
const baseUrl = 'http://localhost:3000/persons'
export const getAll = async () => {
   const request  = axios.get(baseUrl)
   const response = await request
    return response.data
}
export const create = async (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    const response = await request
    return response.data

}

export const update = async (id, updatedPerson) => {
    const request =  axios.put(`${baseUrl}/${id}`, updatedPerson)
    const response = await request
    return response.data
}
export const deletePhoneBook = async (id) => {
    const request =  axios.delete(`${baseUrl}/${id}`)
    const response  = await request
    return response.data    
}
