import { useState, useEffect } from "react";
import { TodoProvider } from "./context/index";
import TextInput from "./components/TextInput";
import TodoDisplay from "./components/TodoDisplay";
import "./App.css";

function App() {
  const [todoLists, setTodoLists] = useState([]);
  const [filter, setfilter] = useState("All");
  // Add Todo Function
  const addTodo = (todo) => {
    setTodoLists((prevTodoLists) => [todo, ...prevTodoLists]);
  };
  // Update Todo Function
  const updateTodo = (id, todo) => {
    setTodoLists((prevTodoLists) =>
      prevTodoLists.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };
  // Delete Todo Function
  const deleteTodo = (id) => {
    setTodoLists((prevTodoLists) =>
      prevTodoLists.filter((prevTodo) => prevTodo.id !== id)
    );
  };
  // Toggle Status
  const toggleStatus = (id) => {
    setTodoLists((prevTodoLists) =>
      prevTodoLists.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  // useEffcet to get todo list from localStorage
  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todoLists"));
    if (todos && todos.length > 0) setTodoLists(todos);
  }, []);

  // useEffect to set todo to localStorage
  useEffect(() => {
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
  }, [todoLists]);

  let filteredTodo = todoLists.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Pending") return !todo.completed;
    if (filter === "Completed") return todo.completed;
  });

  const clearList = () => {
    localStorage.clear();
    setTodoLists([]);
  };

  return (
    <TodoProvider
      value={{ todoLists, addTodo, updateTodo, deleteTodo, toggleStatus }}
    >
      <div className="bg-[#1d3557] w-full h-screen overflow-hidden flex items-center justify-center flex-col">
        <div className="p-3  sm:p-12 sm:w-3/5 w-full">
          <div className="w-full">
            {/* Input Section */}
            <TextInput />
            {/* Task Display Section */}
            <div className="bg-[#f1faee] rounded-md px-4 pb-2 ">
              <div className="flex justify-between items-center py-3 px-2 mb-2 border-b border-slate-600">
                <div className="flex gap-3 sm:gap-4">
                  <button
                    onClick={() => setfilter("All")}
                    className={` ${
                      filter === "All" ? "border-b-2 border-slate-900" : ""
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setfilter("Pending")}
                    className={` ${
                      filter === "Pending" ? "border-b-2 border-slate-900" : ""
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setfilter("Completed")}
                    className={` ${
                      filter === "Completed"
                        ? "border-b-2 border-slate-900"
                        : ""
                    }`}
                  >
                    Completed
                  </button>
                </div>
                <button
                  className=" px-3 py-2 bg-[#f07167] text-[#073b4c] border border-[#073b4c] rounded-md"
                  onClick={clearList}
                >
                  Clear All
                </button>
              </div>
              {(filteredTodo.length ? filteredTodo.map((todo) => (<TodoDisplay todo={todo} key={todo.id} /> )):
              <p className="text-center font-medium text-lg py-2"> No tasks to show right now.</p>)}
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
