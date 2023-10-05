import React from "react";
import { useContext } from "react";
import { GameContext } from "../Context/GameContext";
import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";
import "./Starter.css";

function Starter() {
  const { activeUser, setActiveUser, playerMode, changePlayerMode } =
    useContext(GameContext);
  return (
    <div className="starter">
      <div className="starter_header">
        <Xicon />
        <Oicon />
      </div>
      <div className="card                  shadow-gray">
        <h1 className="text-lg">pick player 1'st mark</h1>

        <div className="start_player">
          <span className={activeUser === 'x'? "start_player--active" : ""} onClick={()=>setActiveUser("x")}>
            <Xicon color={activeUser === "x" ? "dark" : "light"} />
          </span>
          <span className={activeUser === 'o'? "start_player--active" : ""} onClick={()=>setActiveUser("o")}>
            <Oicon color={activeUser === "o" ? "dark" : "light"} />
          </span>
        </div>
        <p className="text-light">remember: x goes first</p>
      </div>
      <div className="start_btns">
        <button className="btn btn-yellow" onClick={()=>changePlayerMode("cpu")}>new game (vs cpu)</button>
        <button className="btn btn-blue" onClick={()=>changePlayerMode("user")}>new game (vs user)</button>
      </div>
    </div>
  );
}

export default Starter;
