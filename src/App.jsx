import { useState, useEffect } from 'react'
import { TodoProvider } from './context/index'
import TextInput from './components/TextInput'
import TodoDisplay from './components/TodoDisplay'
import './App.css'

function App() {
  const [todoLists, setTodoLists] = useState([]);
  // Add Todo Function
  const addTodo = (todo)=>{
    setTodoLists((prevTodoLists)=>([todo,...prevTodoLists]));
  }
  // Update Todo Function
  const updateTodo = (id, todo) => {
    setTodoLists((prevTodoLists) => prevTodoLists.map(prevTodo => prevTodo.id === id ? todo : prevTodo));
  }
  // Delete Todo Function
  const deleteTodo = (id) => {
    setTodoLists((prevTodoLists) => prevTodoLists.filter((prevTodo) => prevTodo.id !== id));
  }
  // Toggle Status
  const toggleStatus = (id)=>{
    setTodoLists((prevTodoLists)=>(prevTodoLists.map((prevTodo)=>prevTodo.id===id?{...prevTodo, completed: !prevTodo.completed}:prevTodo)));
  }

  // useEffcet to get todo list from localStorage
  useEffect(()=>{
    let todos = JSON.parse(localStorage.getItem("todoLists"));
    if(todos && todos.length>0) setTodoLists(todos); 
  },[]);

  // useEffect to set todo to localStorage
  useEffect(()=>{
    localStorage.setItem("todoLists", JSON.stringify(todoLists))
  },[todoLists]);

  return (
    <TodoProvider value={{todoLists, addTodo, updateTodo, deleteTodo, toggleStatus}}>
      <div className='bg-[#1d3557] w-full h-screen overflow-hidden flex items-center justify-center flex-col'>
        <div className='p-3  sm:p-12 sm:w-3/5 '>
        <div className='w-full'>
        {/* Input Section */}
        <TextInput/>
        {/* Task Display Section */}
        {todoLists.map(todo=>
          // <div key={todo.id} className='w-full'>
            <TodoDisplay todo={todo} key={todo.id}/>
          // </div>
        )}
        </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
