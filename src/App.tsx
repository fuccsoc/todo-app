import React, { createContext, useEffect, useState } from "react";
import { Todo } from "./types";
import ToDoList from "./ToDoList";

export const TodoContext = createContext<{
  todos: Todo[] | undefined;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>> | undefined;
}>({
  todos: undefined,
  setTodos: undefined,
});

function App() {
  const localSavedTodos = localStorage.getItem("todos");
  const [todos, setTodos] = useState<Todo[]>(
    localSavedTodos ? JSON.parse(localSavedTodos) : []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // автоматически сохраняем todos в localstorage при изменении списка

  return (
    <>
      <TodoContext.Provider value={{ todos: todos, setTodos: setTodos }}>
        <div className="flex items-center justify-center h-screen">
          <div>
            <h1 className="text-center font-serif text-3xl text-gray-500 p-4">
              todos
            </h1>
            <ToDoList todos={todos} setTodos={setTodos} />{" "}
            {/** Для демонстрации, передаю в props. В TodoItem используется контекст */}
          </div>
        </div>
      </TodoContext.Provider>
    </>
  );
}

export default App;
