import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface University {
    name: string;
    website: string;
    country: string;
}

interface UniversityState {
    data: University[];
    filter: string;
}

const initialState: UniversityState = {
    data: [],
    filter: "",
};

const universitySlice = createSlice({
    name: 'universities',
    initialState,
    reducers: {
        setUniversities: (state, action: PayloadAction<University[]>) => {
            state.data = action.payload;
        },
        addUniversity: (state, action: PayloadAction<University>) => {
            state.data.push(action.payload);
        },
        editUniversity: (state, action: PayloadAction<University>) => {
            const index = state.data.findIndex(univ => univ.name === action.payload.name);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        }
    },
});

export const { setUniversities, addUniversity, editUniversity, setFilter } = universitySlice.actions;
export default universitySlice.reducer;
