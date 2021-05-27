import { useState } from "react";
import TodoState from "../components/TodoState";
import { useDispatch } from "react-redux";
import { add } from "../store/TodosSlice";

function getId() {
  return new Date().getTime().toString();
}

function TodoInput() {
  const [todoLabel, setTodoLabel] = useState("");
  const dispatch = useDispatch();
  const onInputChange = (event: any) => {
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
      onKeyDown={(event: any) => {
        if (event.key === "Enter") {
          const newTodoLabel = todoLabel.trim();
          if (newTodoLabel !== "") {
            dispatch(
              add({ id: getId(), label: newTodoLabel, state: TodoState.Planned })
            );
            clearTextInput();
          }
        }
      }}
      placeholder="Type here"
      type="text"
      autoFocus
    />
  );
}

export default TodoInput;
