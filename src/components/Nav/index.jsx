import React from "react";
import "./Nav.scss";

function Nav({ selAll, selDone, selNotdone, doneTask, items, notDoneTask }) {
  return (
    <div className="todo__nav">
      <ul className="todo__nav_list">
        <li>
          <button onClick={selAll}>{`Все ${items.length}`}</button>
        </li>
        <li>
          <button onClick={selDone}>{`Выполнено ${doneTask}`}</button>
        </li>
        <li>
          <button onClick={selNotdone}>{`Не выполнено ${notDoneTask}`}</button>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
