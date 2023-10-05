import React, {createContext,useState} from "react"

 const ModalContext = createContext()
const ModalState = (props) => {

   const [show,setShow] = useState(false)
   const [mode,setMode] = useState('winner')

   const showModal = () => setShow(true)
   const hideModal = () => setShow(false)


    return(
        <ModalContext.Provider value={{
           setModalMode:setMode,modalMode:mode,
           show,
           showModal,
           hideModal
        }}>
            {props.children}
        </ModalContext.Provider>
    )
}
export {ModalContext , ModalState}