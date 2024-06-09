
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Todo, addNewTodo, fetchTodosRequest } from "../store/todo/todosSlice";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const todos = useSelector((state: RootState) => state.todos.todos);

    useEffect(() => {
        dispatch(fetchTodosRequest())
    }, [])

    const addTodo = () => {
        const todo: Todo = {
            title: newTodo,
            completed: false,
            date: new Date().toISOString()
        }
        dispatch(addNewTodo(todo))
    }

    return (
        <>
            <h4>Todos</h4> hi
            <input type="text" onChange={(e) => setNewTodo(e.target.value)} value={newTodo}/>
            <button onClick={addTodo}>Add</button>
            {
                todos.map((item, index) => <div key={index}>{item.title}dfd</div>)
            }
        </>
    )
}

export default TodoList;