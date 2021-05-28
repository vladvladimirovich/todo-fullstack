import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import TodoFilter from "./TodoFilter";
import TodoCounts from "./TodoCount";
import ToggleAll from "./ToggleAll";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTodos } from "../store/todosSlice";
import { RootState } from "../store/store";
import { useAppSelector } from "../store/hooks";

function TodoApp() {
  const loading = useAppSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loading.loading) {
      dispatch(fetchTodos());
    }
  });
  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <TodoInput />
      </header>

      <section className="main">
        <ToggleAll />
        <TodoList />
      </section>

      <footer className="footer">
        <TodoFilter></TodoFilter>
        <TodoCounts></TodoCounts>
      </footer>
    </section>
  );
}

export default TodoApp;
