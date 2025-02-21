import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers:{
    addNotification(state, action){
      state.push(action.payload)
    },
    emptyNotification(state, action){
          return []
        }
    }
})
  
export const { addNotification, emptyNotification } = notificationSlice.actions
export default notificationSlice.reducer