import React from "react";
import { useContext } from "react";
import { GameContext } from "../Context/GameContext";
import Xicon from "../icons/Xicon";
import Oicon from "../icons/Oicon";

function Win() {
  const { winner, handleNextRound, handleReset } = useContext(GameContext);
  return (
    <div className="score">
      {winner && winner !== "no" ? (
        <>
          <p>you win !</p>
          <h3 className={`score_title ${winner === "o" ? "text-yellow" : "text-blue"}`}>
            {winner === "x" ? <Xicon /> : <Oicon />}
            Takes the round
          </h3>
        </>
      ) : (
        <h3 className="score_title text-yellow">no Winner</h3>
      )}

      <div className="score_btns">
        <button className="btn btn-sm " onClick={handleReset}>
          Quit
        </button>
        <button className="btn btn-sm btn-yellow" onClick={handleNextRound}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Win;
