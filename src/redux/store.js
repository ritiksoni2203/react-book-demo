import {configureStore, getDefaultMiddleware}  from '@reduxjs/toolkit';
import bookReducer from '../redux/book/slice'

const rootReducer = {
    book: bookReducer
};

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

export default configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware
});