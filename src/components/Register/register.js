import React,{useState} from 'react';
import './register.css'
import Footer from '../footer/footer';

export default function Register(props){

    const [errorMsg,setError] = useState('');

    const [name,setName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')

    const inputChanged = (e) =>{
        
        var newValue = null;

        if (e.target.id === "name"){
            newValue = setName(e.target.value)
        }else if(e.target.id ==="email"){
            newValue = setEmail(e.target.value)
        }else{
            newValue = setLastName(e.target.value) 
        }
        return newValue;
    }

    const addUser = (event) =>{
    event.preventDefault()

    //Basic input validation that checks whether the user completed all inputs, the email is available.

    if (name=== '' || lastName === '' || email === ''){
        setError('Input missing');
        return
    }

    if(email.indexOf('@') === -1){
        setError('Email address invalid. @ not found.');
        return
    }
    
    setError('');

    const user = {name,lastName,email}
    
    fetch('http://localhost:3500/user/register',{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(user)
    }).then(res=>{
        if(res.ok){
            setName('')
            setLastName('')
            setEmail('')
            alert('The user has been added')
        }
    })
    
}

    return (
        <>
        <div className='user'>
        
            <form onSubmit={addUser} method="POST" action="/user/submit" >
            <div id='register-div'>
                <div id='register-inputs'>
                    <div id="register-inputs-line1">
                        <div>
                            <p>Name</p>
                            <input type='text' id="name"  onChange={inputChanged} value = {name} ></input>
                        </div>
                        <div>
                            <p>Last name</p>
                            <input type='text' id="lastname" onChange={inputChanged} value = {lastName}  ></input>          
                        </div>
                    </div>
                    <div id="register-inputs-line2">
                        <p>Email</p>
                        <input type='text' id="email" onChange={inputChanged} value = {email} ></input>          
                    </div>                
                </div>
                <p id={errorMsg?'erroActive':''}>{errorMsg}</p>
                <button id='register-button' type='submit' >Register</button>
            </div>
            </form>
        
        </div>
        <Footer current_component = {'register'}/>
        </>
    )
}


