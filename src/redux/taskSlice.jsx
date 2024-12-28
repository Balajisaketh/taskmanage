import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
    user:'' // Array to hold task objects
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        loggeduser:(state,action)=>{
            console.log("i m task data",action.payload)
           state.user=action.payload
            
        },

        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        editTask: (state, action) => {
            const { id, updatedTask } = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id === id);
            if (taskIndex >= 0) {
                state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
    },
});

export const { addTask, editTask, deleteTask,loggeduser } = taskSlice.actions;
export default taskSlice.reducer;
