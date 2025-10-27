import "./App.css";

function App() {
  return (
    <div className="container-app">
      <div className="container-app__header">
        <h1>TAREFAS</h1>

        <input type="text" placeholder="Criar uma nova tarefa" />
      </div>

      <ul className="content-tasks">
        <li className="task-item">Tarefa 1</li>
        <li className="task-item">Tarefa 2</li>
        <li className="task-item">Tarefa 3</li>

        <li className="content-task__actions">
          <div>
            <a href="#">5 items restantes</a>
          </div>

          <div>
            <a href="#">Todas</a>
            <a href="#">Ativas</a>
            <a href="#">Completadas</a>
          </div>

          <div>
            <a href="#">Limpar Completadas</a>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
