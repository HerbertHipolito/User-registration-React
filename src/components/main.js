import React, { useState,useEffect } from 'react';
import './main.css'
//import UserDelete from './form/form'
import Register from './Register/register'

function Main(){
    /*
     = {
        all_users:[],
        newUser:{id:0,name:'',email:'',lastname:''},
        errorMsg:''
    }*/

    const [name,setName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [errorMSg,setError] = useState('');
    const [allUsers,setAllUsers] = useState([]);

    const removeUser =  (id) =>{

        if(window.confirm('Are you sure you want to remove the user '+id)){

            fetch(`https://reqres.in/api/users/${id}`,{
                method: 'DELETE'
            })
            .then(res =>{
                if(res.ok){
                    const users_left = allUsers.filter(user => user.id!==id)
                    setAllUsers(users_left)
                }   
            })
        }
        return 
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

    const addUser = () =>{
        
        if (name === '' || email === '' || lastName === ''){
            setError('Input missing');
            return
        }
        
        const user = {
            'name':name,
            'lastName':lastName,
            'email':email
            }

        fetch('https://reqres.in/api/users',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            setName('')
            setLastName('')
            setEmail('')
            setAllUsers([...allUsers,data])
            }
        )
    }
    
    useEffect( (e)=> {
        fetch('https://reqres.in/api/users')
        .then(res=>res.json())
        .then(datas=>{
            const users = datas.data.map(user => {
                return {
                    id:user.id,
                    name:user.first_name,
                    lastname:user.last_name,
                    email:user.email
                    }
                })
            setAllUsers(users.slice(0,2))
            })
        }
    ,[])
    
    return(
    <div className='user'>
        <Register value = {{'name':name,'lastName':lastName,'email':email}} inputChanged = {inputChanged} registerUser = {addUser} errorMsg = {errorMSg}/>
        {
            allUsers.map(user=>
                <li key={user.id} className='user-data-father'>
                    <div className='user-data'>
                        <div className='form-group'>
                            <button className='delete-button' onClick={ (e)=>removeUser(user.id) }>
                                x
                            </button>
                        </div>   
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Last Name: {user.lastName}</p>
                        <p>Email: {user.email}</p>
                    </div>
                </li>
            )
        }
    </div>
    )


}

export default Main;