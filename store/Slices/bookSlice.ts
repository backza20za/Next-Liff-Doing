import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'
import type { RootState } from '../store'

interface bookState {
    bookName: string,
    bookPrice: number,
    bookImage: string
}

const initialState: bookState = {
    bookName: "",
    bookPrice: 0,
    bookImage: ""
}

const fetchUserById = createAsyncThunk(
    'users/fetchById',
    // if you type your function argument here
    async (userId: number) => {
        const response = await fetch(`https://reqres.in/api/users/${userId}`)
        return (await response.json()) as Returned
    }
)

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        // fill in primary logic here
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserById.pending, (state, action) => {
            // both `state` and `action` are now correctly typed
            // based on the slice state and the `pending` action creator
        })
    },
})
export const bookSelector = (state: RootState) => state.books
export default bookSlice.reducer

