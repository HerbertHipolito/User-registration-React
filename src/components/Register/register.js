import React,{useState} from 'react';
import './register.css'
import Footer from '../footer/footer';

export default function Register(props){

    const [errorMsg,setError] = useState('');
    const [loadingMsg,setLoadingMsg] = useState(false);
    const [name,setName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');

    const addUser = (event) =>{
    event.preventDefault()

    if (name === '' || email === '' || lastName === ''){
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
        setName('')
        setLastName('')
        setEmail('')
        setError('')
        props.setAllUsers([...props.allUsers,datas])
        setLoadingMsg(false);
        alert('The user has been added');
        
        }
    )
}

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
  

    return (
        <>
        <div className='user'>
            <form onSubmit={addUser}>
            <div id='register-div'>
                <div id='register-inputs'>
                    <div id="register-inputs-line1">
                        <div>
                            <p>Name</p>
                            <input type='text' id="name" onChange={inputChanged} value={name} ></input>
                        </div>
                        <div>
                            <p>Last name</p>
                            <input type='text' id="lastname" onChange={inputChanged} value={lastName} ></input>          
                        </div>
                    </div>
                    <div id="register-inputs-line2">
                        <p>Email</p>
                        <input type='text' id="email" onChange={inputChanged} value={email} ></input>          
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


