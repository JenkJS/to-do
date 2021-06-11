import React from "react";
import { useState } from "react";
import axios from "axios";

import "./AddTask.scss";

function AddTask({ addItem, items }) {
  const [inputValue, setInputValue] = useState("");

  const newTask = () => {
    if (inputValue) {
      const newTaskItem = {
        id: Math.floor(Math.random() * 10000) + 1,
        listId: items.id,
        text: inputValue,
        completed: false,
      };
      axios.post("http://localhost:3001/tasks", newTaskItem);
      addItem(newTaskItem);
      setInputValue("");
    } else {
      window.alert("Введите название задания");
    }
  };

  return (
    <div className="addTask">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Новое задание"
        type="text"
      />
      <button onClick={newTask}>Добавить</button>
    </div>
  );
}

export default AddTask;
