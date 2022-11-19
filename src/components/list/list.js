import React from 'react';
import './list.css';
import Footer from '../footer/footer'
import {Link} from 'react-router-dom'

function ListUsers(props){
    return (
        <div className='user'>
            {
            props.allUsers.map(user=>{
                return( 
                <li key={user.id} className='user-data-father'>
                    <div className='user-data'>
                        <div className='form-group'>
                            <button className='delete-button' onClick={ (e)=>props.removeUser(user.id) }>
                                x
                            </button>
                        </div>   
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Last Name: {user.lastName}</p>
                        <p>Email: {user.email}</p>
                        <p><Link to={`/user/${user.id}`}>More details</Link></p>
                    </div>
                </li>)
                }
            )
        }
        <Footer current_component={'list'}/>
        </div>
    )
}

export default ListUsers;