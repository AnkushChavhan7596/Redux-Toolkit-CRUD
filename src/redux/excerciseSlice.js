import { createSlice } from '@reduxjs/toolkit'

export const excerciseSlice = createSlice({
    name : "excercise",

    initialState : {
        excercises : null
    },

    reducers : {
        setExcercises : (state, action) =>{
            state.excercises = action.payload
        },

        addExcercise : (state, action) =>{
            state.excercises = [...state.excercises, action.payload]
        },

        deleteExcercise : (state, action) => {
            state.excercises = state.excercises.filter((excercise) => excercise._id !== action.payload._id)
        },

        updateExcercise : (state, action) => {
            state.excercises = state.excercises.map((excercise) => {
                if(excercise._id === action.payload._id){
                    return {...excercise, excercise:action.payload.excercise, reps : action.payload.reps}
                }

                return excercise;
            })
        }
    }
})

export const { setExcercises , addExcercise, deleteExcercise, updateExcercise } = excerciseSlice.actions;
export default excerciseSlice.reducer;