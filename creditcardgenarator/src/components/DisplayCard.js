import React from 'react'
import './DisplayCard.css';


function DisplayCard(props) {
  let name = ""
  let number = ""
  let month = ""
  let year = ""
  let cvv = ""

  if(props.name.length === 0){
    name = "Jane Appleseed"
    number = "0000 0000 0000 0000"
    month = "00"
    year = "00"
    cvv = "000"
  }else{
    name = props.name
    // number = props.number
    for(let i=0;i<16;i++){
      if((i+1)%4 === 0){
        number = number + props.number[i] + " " 
      }else{
        number = number + props.number[i]
      }
    }
    month = props.month
    year = props.year
    cvv = props.cvv
  }

  return (
      <div className='card'>
         <div className='card-front'>
            <div className='circle'></div>
            <div className='circle-next'></div>
            <div className='card-number'>{number}</div>
            <div className='name-date'>
              <div>{name}</div>
              <div>{month}/{year} </div>
            </div>
         </div>
         <div className='card-back'>
            <div className='black-strip'>
            </div>
            <div className='gray-strip'>
              <div className='card-cvv'>
                {cvv}
              </div>
            </div>
            <div className='line line1'></div>
            <div className='line line2'></div>
            <div className='line line3'></div>
            <br></br>
            <div className='line line4'></div>
            <div className='line line5'></div>
            <div className='line line6'></div>
         </div>
       </div>
   
  )
}


export default DisplayCard