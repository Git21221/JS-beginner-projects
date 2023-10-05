import React,{useContext} from 'react'
import { GameContext } from '../Context/GameContext'
import { ModalContext } from '../Context/ModalContext'
import Oicon from '../icons/Oicon'
import Xicon from '../icons/Xicon'
import "./Board.css"
import BoardCard from './BoardCard'

function Board() {
 

const {squares ,xnext,ties,winner,winnerLine,activeUser,playerMode} = useContext(GameContext)

const {showModal,setModalMode} = useContext(ModalContext)

const resetGame = () =>{
  showModal()
  setModalMode("start")
}

const checkUser = (user)  => {
 if(playerMode === "cpu"){
  if(user === activeUser){
    return "(you)"
  }
  else{
    return "(cpu)"
  }
 }
}

  return (
    <div className='board'>
        <div className="board_header">
            <div>
                <Xicon/>
                <Oicon/>
            </div>
            <div className='board_turn'>
              {!xnext ? (  <Xicon color="light" size="sm"/>):( <Oicon color="light" size="sm"/>)}
               turn
                </div>
            <div>
              <button className='btn btn-sm board_restart' onClick={resetGame}>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="redo"  role="img"viewBox="0 0 512 512"><path fill="currentColor" d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"></path></svg>
              </button>
            </div>
        </div>
        <div className="board_body ">
          {squares.map((sq,ix) => {
            return <BoardCard Key={ix} index={ix} user={sq} active={winner && winnerLine && winnerLine.includes(ix)}/>
          })}
        </div>
        <div className="board_footer">
          <div className="card bg-blue">
            <p className="text-light">{checkUser('x')}</p>
            <strong className="text-2xl">{ties.x}</strong>
          </div>
          <div className="card bg-light">
            <p className="text-light">ties</p>
            <strong className="text-2xl">{ties.x + ties.o}</strong>
          </div>
          <div className="card bg-yellow">
            <p className="text-light">{checkUser('o')}</p>
            <strong className="text-2xl">{ties.o}</strong>
          </div>
        </div>
    </div>
  )
}

export default Board