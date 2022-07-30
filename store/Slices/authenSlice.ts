import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'
import type { RootState } from '../store'

interface userState {
    userId: string,
    displayName: string,
    pictureUrl: string,
    statusMessage: string
}

const initialState: userState = {
    userId: '',
    displayName: '',
    pictureUrl: '',
    statusMessage: ''
}
// const fetchUserById = createAsyncThunk(
//     'users/fetchById',
//     // if you type your function argument here
//     async (userId: number) => {
//         const response = await fetch(`https://reqres.in/api/users/${userId}`)
//         return (await response.json()) as Returned
//     }
// )

const authenSlice = createSlice({
    name: 'authen',
    initialState,
    reducers: {
        trueLogin: (state, action: PayloadAction<userState>) => {
            state.userId = action.payload.userId
            state.displayName = action.payload.displayName
            state.pictureUrl = action.payload.pictureUrl
            state.statusMessage = action.payload.statusMessage
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(fetchUserById.pending, (state, action) => {
        //     // both `state` and `action` are now correctly typed
        //     // based on the slice state and the `pending` action creator
        // })
    },
})
export const authenSelector = (state: RootState) => state.auth
export default authenSlice.reducer

