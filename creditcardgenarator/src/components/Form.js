import React, { useState } from 'react';
import './Form.css';
import DisplayCard from './DisplayCard';

function Form() {

    let [name, setName] = useState('')
    let [number, setNumber] = useState('')
    let [month, setMonth] = useState('')
    let [year, setYear] = useState('')
    let [cvv, setCvv] = useState('')
    let [errorTextNumber, setErrorTextNumber] = useState('')
    let [errorTextName, setErrorTextName] = useState('')
    let [errorTextCvv, setErrorTextCvv] = useState('')
    let [errorTextDate, setErrorTextDate] = useState('')
    let [successText, setSuccessText] = useState('')

    let [nameSub,setNameSub] = useState('')
    let [numberSub, setNumberSub] = useState('')
    let [monthSub, setMonthSub] = useState('')
    let [yearSub, setYearSub] = useState('')
    let [cvvSub, setCvvSub] = useState('')

    const submit = ((e) =>{
        e.preventDefault()

        if(validation()){
            return
        }
        setSuccessText("Your request has been confirmed")
        setNameSub(name)
        setNumberSub(number)
        setMonthSub(month)
        setYearSub(year)
        setCvvSub(cvv)
        
        setErrorTextName('')
        setErrorTextNumber('')
        setErrorTextCvv('')
        setErrorTextDate('')
        setName('')
        setNumber('')
        setMonth('')
        setYear('')
        setCvv('')
       
    })

       
    

    function validation(){
        if(name.length < 1){
            setErrorTextName('enter a valid card name')
            setErrorTextNumber('')
            setErrorTextCvv('')
            setErrorTextDate('')
            return true
        }else if(number.length !== 16){
            setErrorTextNumber('enter a valid card number')
            setErrorTextName('')
            setErrorTextCvv('')
            setErrorTextDate('')
            return true
        }else if(cvv.length !== 3){
            setErrorTextCvv('enter a valid card cvv')
            setErrorTextName('')
            setErrorTextNumber('')
            setErrorTextDate('')
            return true
        }else if(month.length !== 2 || year.length !== 2 || parseInt(month) > 12){
            setErrorTextDate('enter a valid card date')
            setErrorTextName('')
            setErrorTextNumber('')
            setErrorTextCvv('')
            return true
        }
        return false
    }
 
    // const ch = validation()   -->> will not run as it will check inputs are defined or not
    // console.log(ch)

  return (
    <>
    <div className='page'>
        <div className='leftPage'>
        <DisplayCard name={nameSub} number={numberSub} month={monthSub} 
        year={yearSub} cvv={cvvSub}  ></DisplayCard>
        </div>
        <div className='rightPage'>
            <form className='form' onSubmit={submit}>
            <section>
                    <label>
                        Cardholder Name <br></br>
                        <input id='name' placeholder='e.g. Jane Appleseed' type='text'
                        value={name} onChange={(e) =>{
                            setName(e.target.value)
                        }} ></input>
                         <p className='error'>{errorTextName}</p>
                        {/* <br></br> <br></br> */}
                    </label>
                </section>
                    <label>
                        Card Number <br></br>
                        <input id='number' placeholder='e.g. 1234 5678 9123 0000' type='number'
                        value={number} onChange={(e) =>{
                            setNumber(e.target.value)
                        }} ></input>
                        <p className='error'>{errorTextNumber}</p>
                        {/* <br></br> <br></br> */}
                    </label>
                <section className='both'>
                    <label className='date'>
                        Exp.Date(MM/YY)   <br></br>
                        <input className='date-in' placeholder='MM' type='number'
                        value={month} onChange={(e) =>{
                            setMonth(e.target.value)
                        }} >
                            </input> <input className='date-in' placeholder='YY' type='number' 
                            value={year} onChange={(e) =>{
                                setYear(e.target.value)
                            }} ></input> 
                            <p className='error'>{errorTextDate}</p>
                    </label>
                    <label className='cvv'>
                        Cvv<br></br>
                        <input className='cvv-in'  placeholder='e.g. 123' type='number' 
                        value={cvv} onChange={(e) =>{
                            setCvv(e.target.value)
                        }} ></input>
                         <p className='error'>{errorTextCvv}</p>
                        {/* <br></br>  <br></br> */}
                    </label>
                </section>
                <section>
                    <button>Confirm</button>
                </section>
                <p className='success'>{successText}</p>
            </form>
            
        </div>
    </div>
    </>
  )
}

export default Form