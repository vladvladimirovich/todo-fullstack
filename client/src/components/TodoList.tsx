import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import ITodo from "./ITodo";
import TodoState from "./TodoState";
import { remove, toggle } from "../store/TodosSlice";
import Visibility from "../store/Visibility";
import "../css/index.css";

function Todos(props: any) {
  const todos = useSelector((state: any) => state.todos);
  const dispatch = useDispatch();
  const visibility = useSelector((state: any) => state.visibility);

  const filteredTodos = todos.filter((todo: ITodo) => {
    if (
      visibility === Visibility.Completed &&
      todo.state === TodoState.Completed
    ) {
      return true;
    }
    if (visibility === Visibility.Planned && todo.state === TodoState.Planned) {
      return true;
    }
    if (visibility === Visibility.All) {
      return true;
    }
    return false;
  });


  return (
    <ul className="todo-list">
      {filteredTodos.map((todo: ITodo) => (
        <TodoItem
          todoState={todo.state}
          key={todo.id}
          onRemove={() => dispatch(remove(todo.id))}
          onToggle={() => dispatch(toggle(todo.id))}
          className={
            todo.state === TodoState.Completed ? "completed" : "editing"
          }
          checked={todo.state === TodoState.Completed ? true : false}
        >
          {todo.name}
        </TodoItem>
      ))}
    </ul>
  );
}

export default Todos;
