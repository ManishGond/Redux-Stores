import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  id: number | null,
  name: string,
  email: string,
  token: string | null,
  isLoggedIn: boolean
}

const initialState: UserState = {
  id: null,
  name: '',
  email: '',
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token')
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Omit<UserState, "isLoggedIn">>) => {
      Object.assign(state, action.payload)
      state.isLoggedIn = true
      localStorage.setItem('token', action.payload.token || '')
    },
    logout: (state) =>{
      Object.assign(state, {
        id: null, name: '', email: '', token: null, isLoggedIn: false
      });
      localStorage.removeItem('token')
    }
  }
})

export const {login, logout} = userSlice.actions
export default userSlice.reducer