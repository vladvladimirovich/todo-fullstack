import { useState } from "react";
import { TodoState } from "../store/todosSlice";
import { useDispatch } from "react-redux";
import { add } from "../store/todosSlice";
import { ITodo } from "../store/todosSlice";

function getId() {
  return new Date().getTime().toString();
}

function TodoInput() {
  const [todoLabel, setTodoLabel] = useState("");
  const dispatch = useDispatch();
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoLabel(event.target.value);
  };

  const clearTextInput = () => {
    setTodoLabel("");
  };

  return (
    <input
      className="new-todo"
      value={todoLabel}
      onChange={onInputChange}
      onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          const newTodoLabel = todoLabel.trim();
          if (newTodoLabel !== "") {
            const newTodo: ITodo = {
              id: getId(),
              label: newTodoLabel,
              state: TodoState.Planned,
            };
            dispatch(add(newTodo));
          }
          clearTextInput();
        }
      }}
      placeholder="Type here"
      type="text"
      autoFocus
    />
  );
}

export default TodoInput;
