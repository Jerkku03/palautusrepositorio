import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: ['viesti'],
  reducers:{
    addNotification(state, action){
      state.push(action.payload)
    }
  }
})
  
export const { addNotification } = notificationSlice.actions
export default notificationSlice.reducer