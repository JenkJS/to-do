import React from "react";
import axios from "axios";
import "./Tasks.scss";
import removeIcon from "../../assets/icons/remove.svg";

function Tasks({ items, onRemove, onChecked }) {
  const removeItem = (idx) => {
    onRemove(idx);
    axios.delete("http://localhost:3001/tasks/" + idx);
  };
  const onCheckedTask = (e) => {
    onChecked(e.target.id, e.target.checked);
  };
  return (
    <div className="todo__task">
      <ul className="todo__task_list">
        {items.map((item) => (
          <li key={item.id}>
            <input
              onChange={onCheckedTask}
              type="checkbox"
              checked={item.completed}
              id={item.id}
              readOnly
            />
            <label htmlFor={item.id}>
              <span>{item.text}</span>
            </label>

            <i>
              <img
                onClick={() => removeItem(item.id)}
                src={removeIcon}
                alt=""
              />
            </i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
