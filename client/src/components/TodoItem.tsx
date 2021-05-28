import DeleteButton from "./DeleteButton";

interface ITodoItem {
  className: string;
  children: String;
  checked: boolean;
  onToggle: () => void;
  onRemove: () => void;
}

function TodoItem(props: ITodoItem) {
  return (
    <li className={props.className} onClick={props.onToggle}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={props.checked}
          readOnly
        />
        <label>{props.children}</label>
        <DeleteButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            props.onRemove();
            e.stopPropagation();
          }}
        />
      </div>
    </li>
  );
}

export default TodoItem;
