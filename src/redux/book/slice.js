import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "../../helpers/axios";
import { toast } from "react-toastify";

const initialStates = {
    data: [],
    loading: false,
    profile: []
}

export const booksList = createAsyncThunk(
    'booksList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get('/books');
            return response.data;
        }
        catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
)

export const getBookById = createAsyncThunk(
    'getBookById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(`/books/${id}`);
            return response.data;
        }
        catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
)

const bookSlice = createSlice({
    name: 'book',
    initialState: initialStates,
    extraReducers: {
        [booksList.pending]: (state) => {
            state.loading = true
        },
        [booksList.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.profile = []
        },
        [booksList.rejected]: (state) => {
            state.loading = false
        },
        [getBookById.pending]: (state) => {
            state.loading = true
        },
        [getBookById.fulfilled]: (state, action) => {
            state.loading = false
            state.profile = action.payload
        },
        [getBookById.rejected]: (state) => {
            state.loading = false
        }
    }
})

const { reducer } = bookSlice;

export default reducer