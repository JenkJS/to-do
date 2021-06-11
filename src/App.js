import { useEffect, useState } from "react";
import axios from "axios";

import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask/index";
import Nav from "./components/Nav/index";

import "./App.scss";

function App() {
  const [itemsList, setItemsList] = useState(0);
  const [doneTask, setDoneTask] = useState(0);
  const [notDoneTask, setNotDoneTask] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks")
      .then(({ data }) => setItemsList(data));
  }, []);
  useEffect(() => {
    const countTaskDone =
      itemsList && itemsList.filter((item) => item.completed === true);
    setDoneTask(countTaskDone.length);
    const countNotTaskDone =
      itemsList && itemsList.filter((item) => item.completed === false);
    setNotDoneTask(countNotTaskDone.length);
  }, [itemsList]);

  const onRemove = (idx) => {
    const newItemsList = itemsList.filter((item) => item.id !== idx);
    setItemsList(newItemsList);
  };
  const addItem = (obj) => {
    const updateList = [...itemsList, obj];
    setItemsList(updateList);
  };

  const onChecked = (idx, completed) => {
    const updateList = itemsList.map((item) => {
      if (item.id === Number(idx)) {
        item.completed = completed;
      }
      return item;
    });
    setItemsList(updateList);
    axios.patch("http://localhost:3001/tasks/" + idx, {
      completed,
    });
  };
  const selAll = () => {
    axios.get("http://localhost:3001/tasks").then(({ data }) => {
      setItemsList(data);
    });
  };

  const selDone = () => {
    axios
      .get("http://localhost:3001/tasks?title=json-server&completed=true")
      .then(({ data }) => {
        setItemsList(data);
      });
  };

  const selNotdone = () => {
    axios
      .get("http://localhost:3001/tasks?title=json-server&completed=false")
      .then(({ data }) => {
        setItemsList(data);
      });
  };

  return (
    <div className="todo">
      <div className="todo__list">
        <h1>To-do</h1>

        <AddTask items={itemsList} addItem={addItem} />
        {itemsList && (
          <Nav
            doneTask={doneTask}
            notDoneTask={notDoneTask}
            items={itemsList}
            selDone={selDone}
            selAll={selAll}
            selNotdone={selNotdone}
          ></Nav>
        )}
        {itemsList ? (
          <Tasks onChecked={onChecked} items={itemsList} onRemove={onRemove} />
        ) : (
          "isLoading"
        )}
      </div>
    </div>
  );
}

export default App;
