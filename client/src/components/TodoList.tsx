import { useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { ITodo } from "../store/todosSlice";
import { remove, toggle, TodoState } from "../store/todosSlice";
import { Visibility } from "../store/visibilitySlice";
import "../css/index.css";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";

function Todos() {
  const todos = useAppSelector((state: RootState) => state.todos);
  const visibility = useAppSelector((state: RootState) => state.visibility);
  const dispatch = useDispatch();

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
          key={todo.id}
          onRemove={() => dispatch(remove(todo.id))}
          onToggle={() => dispatch(toggle(todo.id))}
          className={
            todo.state === TodoState.Completed ? "completed" : "editing"
          }
          checked={todo.state === TodoState.Completed ? true : false}
        >
          {todo.label}
        </TodoItem>
      ))}
    </ul>
  );
}

export default Todos;
