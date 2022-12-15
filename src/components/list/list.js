import React,{useState,useEffect} from 'react';
import './list.css';
import Footer from '../footer/footer'
import {Link} from 'react-router-dom'

function ListUsers(props){
    
  const [allUsers,setAllUsers] = useState([]);

  const retrieveUsers = (data)=>{
    const users = data.map(user => {
        return {
            id:user._id,
            name:user.name,
            lastName:user.lastName,
            email:user.email
            }}
        )
        setAllUsers(users)
    return users;
    }

  const removeUser = (id) =>{
    
    if(window.confirm('Are you sure you want to remove the user '+id)){
        fetch(`${process.env.LOCAL_HOST}/user/delete/${id}`,{
            method: 'DELETE'
        }).then(res=>{
            if(res.ok){
                fetch(`${process.env.LOCAL_HOST}/user/list`)
                .then(res=>res.json())
                .then(data=>data.error?alert('data.error'):retrieveUsers(data.list))
            }
        })
    }}

  useEffect( (e)=> {
      fetch(`${process.env.LOCAL_HOST}/user/list`)
      .then(res=>res.json())
      .then(data=>data.error?alert('data.error'):retrieveUsers(data.list))
            }
        ,[])

    return (
        <ul className='user'>
            {
            allUsers.map(user=>{
                return( 
                <li key={user.id} className='user-data-father'>
                    <div className='user-data'>
                        <div className='form-group'>
                            <button className='delete-button' onClick={ (e)=>{removeUser(user.id);} }>
                               x
                            </button>
                        </div>   
                        <p>Name: {user.name}</p>
                        <p>Last Name: {user.lastName}</p>
                        <p>Email: {user.email}</p>
                        <div className='button-details'>
                        <p ><Link to={`/user/${user.id}`}>More details</Link></p>
                        </div>
                    </div>
                </li>)
                }
            )
        }
        <Footer current_component={'list'}/>
        </ul>
    )
}

export default ListUsers;