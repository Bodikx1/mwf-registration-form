import axios from 'axios'

const API_URL = 'https://n3fgl9wulk.execute-api.eu-west-2.amazonaws.com/dev/v1'

export const getUserByEmail = (userId: string) => {
  return axios.get(`${API_URL}/users/${userId}`, {
    headers: {
      'X-Api-Key': process.env.REACT_APP_X_API_KEY
    }
  })
}

export const createUser = (data: object) => {
  return axios({
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': process.env.REACT_APP_X_API_KEY
    },
    url: `${API_URL}/users`,
    method: 'POST',
    data: JSON.stringify(data)
  })
}
