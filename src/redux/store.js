import { configureStore } from '@reduxjs/toolkit'
import excerciseReducer from "./excerciseSlice";

export default configureStore({
    reducer : {
        excercise : excerciseReducer, 
    },
})