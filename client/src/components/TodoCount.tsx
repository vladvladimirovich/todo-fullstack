import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';

function TodoCounts() {

    const count = (useAppSelector((state: RootState) => state.todos.length));

  return (
    <span className="todo-count">
      <strong>{count}</strong> item left
    </span>
  );
}

export default TodoCounts;
