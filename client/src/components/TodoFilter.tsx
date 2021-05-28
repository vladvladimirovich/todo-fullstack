import { useDispatch } from "react-redux";
import { useState } from "react";
import { all, planned, completed } from "../store/visibilitySlice";

function TodoFilter() {
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();

  const setClass = (id: number) => {
    if (id === select) {
      return "selected";
    }
    return "";
  }

  return (
    <ul className="filters">
      <li
        onClick={() => {
          dispatch(all());
          setSelect(0);
        }}
      >
        <a className={setClass(0)} href="#/">
          All
        </a>
      </li>
      <li
        onClick={() => {
          dispatch(planned());
          setSelect(1);
        }}
      >
        <a className={setClass(1)} href="#/active">Active</a>
      </li>
      <li
        onClick={() => {
          dispatch(completed());
          setSelect(2);
        }}
      >
        <a className={setClass(2)} href="#/completed">Completed</a>
      </li>
    </ul>
  );
}

export default TodoFilter;
