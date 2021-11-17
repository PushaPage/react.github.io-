import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

        if (!response.ok) {
            throw new Error('ServerError!');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id, { rejectWithValue, dispatch }) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Can't delete task. Server error!");
        }

        dispatch(removeTodo({ id }));
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async (id, { rejectWithValue, dispatch, getState }) => {
        const todo = getState().todos.todos.find(todo => todo.id === id);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATH',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    'Access-Control-Allow-Headers':
                        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                }),
            });

            if (!response.ok) {
                throw new Error("Can't toggle status. Server error!");
            }

            dispatch(toggleTodoComplete({ id }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (text, { rejectWithValue, dispatch }) => {
    try {
        const todo = {
            userId: 1,
            title: text,
            completed: false,
        };
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });

        if (!response.ok) {
            throw new Error("Can't add task. Server error!");
        }

        const data = await response.json();
        data.id = new Date().toISOString();

        dispatch(addTodo(data));

        console.log(data);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
};

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload);
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
        toggleTodoComplete(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
            toggledTodo.completed = !toggledTodo.completed;
        },
    },
    extraReducers: {
        [fetchTodos.pending]: state => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: setError,
        [deleteTodo.rejected]: setError,
        [toggleStatus.rejected]: setError,
        [addNewTodo.rejected]: setError,
    },
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
