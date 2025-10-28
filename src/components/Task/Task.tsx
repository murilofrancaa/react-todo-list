import type { TaskType } from "../../types/TaskType";
import "./Task.css";


interface ITaskProps{

    task: TaskType;
    handleTaskToggle: (id: string) => void;
}

export function Task(props : ITaskProps){
    return(<li
                  className={`task-item ${props.task.done ? "task-item__done" : ""}`}
                  key={props.task.id}
                >
                  <input
                    type="checkbox"
                    checked={props.task.done}
                    onChange={() => props.handleTaskToggle(props.task.id)}
                  />
                  {props.task.title}
                </li>)
}