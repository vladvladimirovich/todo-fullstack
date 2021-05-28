import { useState } from "react";
import { useDispatch } from "react-redux";
import { markAll, unmarkAll } from "../store/todosSlice";

function ToggleAll() {
    const dispatch = useDispatch();
    const [state, setState] = useState(false);


  const toggler = () => {
    if (state === true) {
      dispatch(unmarkAll());
      setState(false);
    } else {
      dispatch(markAll());
      setState(true);
    }
  };

  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
      />
      <label onClick={toggler} form="toggle-all">Mark all as complete</label>
    </>
  );
}

export default ToggleAll;
