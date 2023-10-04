import React from 'react'
import { useContext } from 'react'
import { ModalContext } from '../Context/ModalContext'
// import Xicon from '../icons/Xicon'
import Win from '../WinRestart/Win'
import "./Model.css"
import Restart from "../WinRestart/Restart" 

const Model = () => {
  const {show,modalMode} = useContext(ModalContext)
  return (
    <>
    {show && (
 <div className="modal">
 <div className="modal_content">
       <div className="container">
            {modalMode === 'winner' && <Win/> }
            {modalMode === 'start' && <Restart/> }
       </div>
 </div>
</div>
    )}
    
    </>
  )
}

export default Model