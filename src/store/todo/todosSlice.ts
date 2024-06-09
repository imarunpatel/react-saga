import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface Todo {
    title: string
    completed: boolean
    date: string
}

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: null | string;
}

const initialState: TodoState = {
    todos: [{title:"Hello", completed: false, date: new Date().toISOString()}],
    loading: false,
    error: null
}

const todosSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        fetchTodosRequest(state) {
            state.loading = true
            state.error = null
        },
        fetchTodosSuccess(state, action: PayloadAction<Todo[]>) {
            state.todos = action.payload;
            state.loading = false;
            state.error = null;
        },
        addNewTodo(state, action: PayloadAction<Todo>) {
            state.todos = [...state.todos, action.payload];
        
        }
    }
});

export const { fetchTodosRequest, fetchTodosSuccess, addNewTodo } = todosSlice.actions;

export default todosSlice.reducer;