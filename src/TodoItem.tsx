import { useContext } from "react";
import { TodoContext } from "./App";

export default function TodoItem(props: {
  isDone: boolean;
  description: string;
  id: number;
}) {
  const { todos, setTodos } = useContext(TodoContext);
  if (!(todos && setTodos)) return <></>;
  return (
    <>
      <div className="flex justify-between items-center p-2 border rounded-lg">
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={props.isDone}
            onChange={() => {
              setTodos(
                todos.map((todo) => {
                  if (todo.id === props.id)
                    return { ...todo, isDone: !props.isDone };
                  else return todo;
                })
              );
            }}
            className="w-6 h-6 rounded-[50%] text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <div className="text-lg text-gray-500">{props.description}</div>
        </div>
        <button
          onClick={() =>
            setTodos(
              todos.filter((todo) => {
                if (todo.id === props.id) return false;
                else return true;
              })
            )
          }
          className="border py-1 px-3 text-white flex items-center justify-center rounded-lg bg-red-500"
        >
          X
        </button>
      </div>
    </>
  );
}
