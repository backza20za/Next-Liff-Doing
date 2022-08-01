import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { stat } from 'fs'
import type { RootState } from '../store'
import httpClient from '../../utils/httpClient'

interface addState {
    name: string,
    price: number,
    image: string,
    card: number
}
interface keepBooks {
    bookName: string,
    bookImg: string,
    bookPrice: number
}
interface bookState {
    dataBooks: keepBooks[]
    addToCard: addState[]
}

const initialState: bookState = {
    dataBooks: [],
    addToCard: []
}
// callback data type
interface dataBooks {
    bookName: string,
    bookImg: string,
    bookPrice: number
}

interface responseData {
    books: dataBooks[]
}

export const getBook = createAsyncThunk(
    'users/books',
    // if you type your function argument here
    async () => {
        const response = await httpClient.get<responseData>(`/hello`)
        return response.data
    }
)

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        addCart: (state, action: PayloadAction<addState>) => {

            let count: number = 0
            let index: number = 0
            const cart = state.addToCard.map((data, index) => {
                if (data.name === action.payload.name) {
                    count++
                    index = index
                    let a = data.card + action.payload.card
                    return { ...data, card: a };
                }
                return data;
            });
            if (count === 0) {
                state.addToCard.push(action.payload)
            } else {
                state.addToCard[index] = cart
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getBook.pending, (state, action) => {
            state.dataBooks = []
            state.addToCard = []
        })
        builder.addCase(getBook.fulfilled, (state, action) => {
            state.dataBooks = action.payload.books
            state.addToCard = []
        })
        builder.addCase(getBook.rejected, (state, action) => {
            state.dataBooks = []
            state.addToCard = []
        })
    },
})
export const { addCart } = bookSlice.actions
export const bookSelector = (state: RootState) => state.books
export default bookSlice.reducer

