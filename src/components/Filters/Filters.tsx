import type { FilterType } from "../../types/FilterType";
import type { TaskType } from "../../types/TaskType";
import "./Filters.css"

interface IFilterProps {
  tasks: TaskType[];
  handleSetTasks: (props: TaskType[]) => void;
  handleSetFilter: (props: FilterType) => void;
}

export function Filters(props: IFilterProps) {
  const pendingTasksQtd = props.tasks.filter((task) => !task.done).length;

  function handleUncheckAllCompletedTasks() {
    const filteredTasks = props.tasks.map((task) =>
      task.done ? { ...task, done: false } : task
    );

    props.handleSetTasks(filteredTasks);
  }

  return (
    <li className="content-task__actions">
      <div>
        <a href="#">{pendingTasksQtd} items restantes</a>
      </div>

      <div>
        <a href="#" onClick={() => props.handleSetFilter("all")}>
          Todas
        </a>
        <a href="#" onClick={() => props.handleSetFilter("pending")}>
          Ativas
        </a>
        <a href="#" onClick={() => props.handleSetFilter("done")}>
          Completadas
        </a>
      </div>

      <div>
        <a href="#" onClick={handleUncheckAllCompletedTasks}>
          Limpar Completadas
        </a>
      </div>
    </li>
  );
}
