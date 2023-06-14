import React, { useState } from "react";
import { Todo } from "./types";
import TodoItem from "./TodoItem";

export default function ToDoList(props: {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}): JSX.Element {
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState<"none" | "completed" | "active">("none");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.setTodos([
            ...props.todos,
            { description: description, isDone: false, id: Date.now() },
          ]);
          setDescription("");
        }}
      >
        <input
          type="text"
          className="border rounded-lg p-2 text-gray-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="ml-4 p-2 border rounded-lg text-gray-500"
          type="submit"
        >
          add
        </button>
      </form>
      <div className="pt-4">
        <fieldset
          className="flex gap-2 justify-center"
          onChange={(e) => setFilter((e.target as any).value)}
        >
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex">
            <li className="w-full border-r border-gray-300 p-2">
              <div className="flex items-center gap-2">
                <input name="filter" type="radio" value="none" />
                <label>All</label>
              </div>
            </li>
            <li className="w-full border-r border-gray-300 p-2">
              <div className="flex items-center gap-2">
                <input name="filter" type="radio" value="active" />
                <label>Active</label>
              </div>
            </li>
            <li className="w-full  border-gray-300 p-2">
              <div className="flex items-center gap-2">
                <input name="filter" type="radio" value="completed" />
                <label>Completed</label>
              </div>
            </li>
          </ul>
        </fieldset>
      </div>
      <div className="pt-4 flex flex-col gap-2">
        {
          // eslint-disable-next-line array-callback-return
          props.todos.map((todo) => {
            if (filter === "active" && !todo.isDone)
              return (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  description={todo.description}
                  isDone={todo.isDone}
                />
              );
            if (filter === "completed" && todo.isDone)
              return (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  description={todo.description}
                  isDone={todo.isDone}
                />
              );
            if (filter === "none")
              return (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  description={todo.description}
                  isDone={todo.isDone}
                />
              );
          })
        }
      </div>
    </>
  );
}
