import React from 'react';
import './register.css'
import Footer from '../footer/footer';

export default function Register(props){

    return (
        <>
        <div className='user'>
            <div id='register-div'>
                <div id='register-inputs'>
                    <div id="register-inputs-line1">
                        <div>
                            <p>Name</p>
                            <input type='text' id="name" onChange={props.inputChanged} value={props.value.name} ></input>
                        </div>
                        <div>
                            <p>Last name</p>
                            <input type='text' id="lastname" onChange={props.inputChanged} value={props.value.lastName} ></input>          
                        </div>
                    </div>
                    <div id="register-inputs-line2">
                        <p>Email</p>
                        <input type='text' id="email" onChange={props.inputChanged} value={props.value.email} ></input>          
                    </div>                
                </div>
                {props.loadingMsg?<p id="loading-msg">Listing the user</p>:null}
                <p id={props.errorMsg?'erroActive':''}>{props.errorMsg}</p>
                <button id='register-button' type='submit' onClick={props.registerUser}>Register</button>
            </div>
        </div>
        <Footer current_component = {'register'}/>
        </>
    )
}


