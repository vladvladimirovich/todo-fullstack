import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import TodoFilter from "./TodoFilter";
import TodoCounts from "./TodoCount";
import ToggleAll from "./ToggleAll";
import { fetchTodos } from "../store/TodosSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
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
export default App;
