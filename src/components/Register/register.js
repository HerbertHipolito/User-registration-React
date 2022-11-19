import React,{useState,useRef} from 'react';
import './register.css'
import Footer from '../footer/footer';

export default function Register(props){

    const [errorMsg,setError] = useState('');
    const [loadingMsg,setLoadingMsg] = useState(false);

    const refName = useRef()
    const refLastName = useRef()
    const refEmail = useRef()

    const addUser = (event) =>{
    event.preventDefault()

    //Basic input validation that checks whether the user completed all inputs, the email is available, and the email contains the @ character.
    var [name,lastName,email] = [refName.current.value,refLastName.current.value,refEmail.current.value]

    if (name=== '' || lastName === '' || email === ''){
        setError('Input missing');
        return
    }

    if(email.indexOf('@') === -1){
        setError('Email address invalid. @ not found.');
        return
    }

    for(let myUser of props.allUsers){
        if (myUser.email === email){
            setError('Email address already exists');
            return
        }
    }
    
    setLoadingMsg(true);
    setError('');

    const user = {name,lastName,email}
    
    fetch('https://reqres.in/api/users',{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(user)
    }).then(res =>res.json())
      .then(datas => {
        props.setAllUsers([...props.allUsers,datas])
        setLoadingMsg(false);
        alert('The user has been added');
        
        }
    )
    
}

    return (
        <>
        <div className='user'>
        
            <form onSubmit={addUser} >
            <div id='register-div'>
                <div id='register-inputs'>
                    <div id="register-inputs-line1">
                        <div>
                            <p>Name</p>
                            <input type='text' id="name"  ref={refName}  ></input>
                        </div>
                        <div>
                            <p>Last name</p>
                            <input type='text' id="lastname" ref={refLastName}  ></input>          
                        </div>
                    </div>
                    <div id="register-inputs-line2">
                        <p>Email</p>
                        <input type='text' id="email" ref={refEmail} ></input>          
                    </div>                
                </div>
                {loadingMsg?<p id="loading-msg">Listing the user</p>:null}
                <p id={errorMsg?'erroActive':''}>{errorMsg}</p>
                <button id='register-button' type='submit' >Register</button>
            </div>
            </form>
        
        </div>
        <Footer current_component = {'register'}/>
        </>
    )
}


