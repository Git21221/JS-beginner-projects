import React from 'react'
import { useContext } from 'react'
import { GameContext } from '../Context/GameContext'
import { ModalContext } from '../Context/ModalContext'

function Restart() {
  const {handleReset} = useContext(GameContext)
  const {hideModal} = useContext(ModalContext)
  return (
    <div className="restart">
     <h3 className="restart_title">
       restart game
     </h3>
     <div className="restart_btns">
       <button className="btn btn-sm" onClick={hideModal}>no cancel</button>
       <button className="btn btn-sm btn-yellow" onClick={handleReset}>yes ,restart</button>
     </div>
   </div>
  )
}

export default Restart