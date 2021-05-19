import {useSelector} from 'react-redux';

function TodoCounts() {

    const count = (useSelector((state: any) => state.todos.length));

  return (
    <span className="todo-count">
      <strong>{count}</strong> item left
    </span>
  );
}

export default TodoCounts;
