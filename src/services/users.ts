import axios from "axios"
import { User } from "../store/system/types"

const login_url = "http://localhost:3001/api/login"

const user_url = "http://localhost:3001/api/users"

interface UserBody {
  username: string;
  password: string;
}

export const login = (login_body: UserBody): Promise<User> => {
  return axios.post(login_url, login_body).then(res => {
    return res.data
  })
}

export const createUser = (user_body: UserBody): Promise<void> => {
  return axios.post(user_url, user_body)
}