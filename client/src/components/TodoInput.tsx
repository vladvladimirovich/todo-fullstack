import { useState } from "react";
import TodoState from "../components/TodoState";
import { useDispatch } from "react-redux";
import { add } from "../store/TodosSlice";

function getId() {
  return new Date().getTime().toString();
}

function TodoInput() {
  const [todoName, setTodoName] = useState("");
  const dispatch = useDispatch();
  const onInputChange = (event: any) => {
    setTodoName(event.target.value);
  };

  const clearTextInput = () => {
    setTodoName("");
  };

  return (
    <input
      className="new-todo"
      value={todoName}
      onChange={onInputChange}
      onKeyDown={(event: any) => {
        if (event.key === "Enter") {
          const newTodoName = todoName.trim();
          if (newTodoName !== "") {
            dispatch(
              add({ id: getId(), name: newTodoName, state: TodoState.Planned })
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