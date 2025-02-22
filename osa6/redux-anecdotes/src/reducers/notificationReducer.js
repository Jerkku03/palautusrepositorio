import { createSlice } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

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

export const setNotification = (content, time) => {
  return async (dispatch) => {
  setTimeout(() => {
    dispatch(emptyNotification())
  }, time  * 1000)
  dispatch(addNotification(content))
  }
}
  
export const { addNotification, emptyNotification } = notificationSlice.actions
export default notificationSlice.reducer