import EmptyIMG from "../../assets/empty.svg";
import "./Empty.css";

export function Empty(){
    return(<div className="contaiiner-empty">
              <img src={EmptyIMG} alt="empty"></img>
              <h3>Nenhuma tarefa!</h3>
            </div>)
}