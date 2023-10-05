import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { calcBestMove, calcWinner } from "../Helper/CalcSquares";
import { ModalContext } from "./ModalContext";

const GameContext = createContext();

const GameState = (props) => {
  const { showModal, setModalMode, hideModal } = useContext(ModalContext);

  const [screen, setScreen] = useState("start");

  const [activeUser, setActiveUser] = useState("x");
  const [playerMode, setPlayerMode] = useState("user");

  const [squares, setSquares] = useState(new Array(9).fill(""));

  const [xnext, setXnext] = useState(false);

  const [winner, setWinner] = useState(null);
  const [winnerLine, setWinnerLine] = useState(null);

  const [ties, setTies] = useState({ x: 0, o: 0 });

  useEffect(() => {

    const currentUser = xnext ? "o" : "x";
    if (playerMode === "cpu" && currentUser !== activeUser && !winner) {
      cpuNextCpu(squares);
    }
    checkNoWinner();
  }, [xnext, winner, screen]);

  const changePlayerMode = (mode) => {
    setPlayerMode(mode);
    setScreen("game");
  };

  const handleSquareClick = (ix) => {
   
    if (squares[ix] || winner) {
      return;
    }
    const currentUser = xnext ? "o" : "x";
    if (playerMode == "cpu" && currentUser !== activeUser) {
      return;
    }

    let ns = [...squares];
    ns[ix] = !xnext ? "x" : "o";

    setSquares(ns);
    setXnext(!xnext);
    checkWinner(ns);
  };

  const checkWinner = (ns) => {
    const isWinner = calcWinner(ns);
    if (isWinner) {
      setWinner(isWinner.winner);
      setWinnerLine(isWinner.lines);

      //set ties
      const ti = { ...ties };
      ti[isWinner.winner] += 1;
      setTies(ti);
      showModal();
      setModalMode("winner");
    }
  };

  const checkNoWinner = () => {
    const moves = squares.filter((sq) => sq === "");
    if (moves.length === 0) {
      setWinner("no");
      showModal();
      setModalMode("winner");
    }
  };

  const handleReset = () => {
    setSquares(new Array(9).fill(""));
    setXnext(false);
    setWinner(null);
    setWinnerLine(null);
    setActiveUser("x");
    setTies({ x: 0, o: 0 });
    hideModal();
    setScreen("start");
  };

  const handleNextRound = () => {
    setSquares(new Array(9).fill(""));
    setXnext(winner === "x");
    setWinner(null);
    setWinnerLine(null);
    hideModal();
  };

  const cpuNextCpu = (sq) => {
    const bestMove = calcBestMove(sq, activeUser === "x" ? "o" : "x");
    console.log(bestMove)
    let ns = [...squares];
    ns[bestMove] = !xnext ? "x" : "o";
    setSquares(ns);
    setXnext(!xnext);
    checkWinner(ns);
};

  return (
    <GameContext.Provider
      value={{
        screen,
        activeUser,
        squares,
        xnext,
        ties,
        winner,
        winnerLine,
        handleNextRound,
        handleReset,
        setActiveUser,
        handleSquareClick,
        playerMode,
        changePlayerMode,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export { GameContext, GameState };
