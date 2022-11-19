import React,{useState,useEffect} from 'react';
import {useParams,Link} from 'react-router-dom';
import Footer from '../footer/footer';
import './userDetail.css';

export default function UserDetail(props) {

    const {id} = useParams();
    const [user,setUser] = useState({});
    
    useEffect( ()=> {
        fetch(`https://reqres.in/api/users/${id}`)
        .then(res=>res.json())
        .then(datas=>{

            if(datas.data){
                setUser({
                    id:1*datas.data.id,
                    name:datas.data.first_name,
                    lastName:datas.data.last_name,
                    email:datas.data.email,
                    photo:datas.data.avatar
                })
                return     
            }
            props.allUsers.forEach(element => {
                if (element.id === id){
                    setUser({
                        id:element.id,
                        name:element.name,
                        lastName:element.lastName,
                        email:element.email,
                        photo:null
                        })
                    return 
                    }
                })
            })
        },[id,props.allUsers])

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