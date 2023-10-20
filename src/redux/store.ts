import { configureStore } from '@reduxjs/toolkit';
import universityReducer from './slices/universitySlice';

const store = configureStore({
    reducer: {
        universities: universityReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
