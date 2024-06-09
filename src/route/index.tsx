import { createBrowserRouter } from "react-router-dom";
import PostList from "../components/PostList";
import TodoList from "../components/TodoList";


export const router = createBrowserRouter([
    {
        path: '',
        element: <PostList />
    },
    {
        path: 'todo',
        element: <TodoList />
    }
])