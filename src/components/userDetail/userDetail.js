import React,{useState,useEffect} from 'react';
import {useParams,Link} from 'react-router-dom';
import Footer from '../footer/footer';
import './userDetail.css';

export default function UserDetail() {

    const {id} = useParams();
    const [user,setUser] = useState({});
    
    useEffect( ()=> {
        fetch(`http://localhost:3500/user/${id}`)
        .then(res=>res.json())
        .then(data=>{
            if(data){
                setUser({
                    id:data._id,
                    name:data.name,
                    lastName:data.lastName,
                    email:data.email,
                    photo:null
                })
                return     
            }
            
            })
        },[id]
        
        
        )

    if(user.name !== undefined){
        return <>
        <div id='user-data'>
        <p id="user-title">{user.name} {user.lastName}</p>
        <img hidden={user.photo?false:true} src={user.photo} alt={user.name}/>
        <p id="user-email">{user.email}</p>
        <Link to='/user/list'>Back HomePage</Link>
        </div>
        <Footer/>
        </>
    }
    
    return <>
        <div id='user-data'>
        <h1>User not Found!</h1>
        <Link to='/user/list'>Back HomePage</Link>
        </div>
        <Footer/>
        </>
    
}