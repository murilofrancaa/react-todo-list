import { useState } from "react";
import "./App.css";
import type { TaskType } from "./types/TaskType";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "usehooks-ts";
import Empty from "./assets/empty.svg";

function App() {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<"all" | "done" | "pending">("all");
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("tasks-list", []);
 

  const pendingTasksQtd = tasks.filter((task) => !task.done).length;

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (input.length && event.key === "Enter") {
      setTasks([...tasks, { id: uuidv4(), done: false, title: input }]);
    }
  }

  function handleTaskToggle(id: string) {
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }


  function filteredTasks(){
    switch (filter) {
      case "all":
        return tasks;
        
      case "done":
        return tasks.filter((task) => task.done);
      

      case "pending":
        return tasks.filter((task) => !task.done)
    
      default:
        return tasks;
    }
  }

  function handleUncheckAllCompletedTasks(){

    setTasks((prevState) => prevState.map((task) => (task.done ? {...task, done: false} : task)))
  }

  return (
    <div className="container-app">
      <div className="container-app__header">
        <h1>TAREFAS</h1>

        <input
          type="text"
          placeholder="Criar uma nova tarefa"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <ul className="content-tasks">
        <div>
          {filteredTasks().map((t) => (
            <li
              className={`task-item ${t.done ? "task-item__done" : ""}`}
              key={t.id}
            >
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => handleTaskToggle(t.id)}
              />
              {t.title}
            </li>
          ))}

          {!filteredTasks().length && (
            <div className="contaiiner-empty">
              <img src={Empty} alt="empty"></img>
              <h3>Nenhuma tarefa!</h3>
            </div>
          )}
        </div>

        <li className="content-task__actions">
          <div>
            <a href="#">{pendingTasksQtd} items restantes</a>
          </div>

          <div>
            <a href="#" onClick={() => setFilter("all")}>Todas</a>
            <a href="#" onClick={() => setFilter("pending")}>Ativas</a>
            <a href="#" onClick={() => setFilter("done")}>Completadas</a>
          </div>

          <div>
            <a href="#" onClick={handleUncheckAllCompletedTasks}>Limpar Completadas</a>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
