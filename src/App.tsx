import { useState } from "react";
import "./App.css";
import type { TaskType } from "./types/TaskType";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "usehooks-ts";
import { Empty } from "./components/Empty/Empty";
import { Task } from "./components/Task/Task";
import { Filters } from "./components/Filters/Filters";
import type { FilterType } from "./types/FilterType";

function App() {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("tasks-list", []);

  function handleSetFilter(newFilter: FilterType) {
    setFilter(newFilter);
  }

  function handleSetTasks(newTasks: TaskType[]) {
    setTasks(newTasks);
  }

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

  function filteredTasks() {
    switch (filter) {
      case "all":
        return tasks;

      case "done":
        return tasks.filter((task) => task.done);

      case "pending":
        return tasks.filter((task) => !task.done);

      default:
        return tasks;
    }
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
            <Task task={t} handleTaskToggle={handleTaskToggle} />
          ))}

          {!filteredTasks().length && <Empty />}
        </div>

        <Filters
          handleSetTasks={handleSetTasks}
          tasks={tasks}
          handleSetFilter={handleSetFilter}
        />
      </ul>
    </div>
  );
}

export default App;
