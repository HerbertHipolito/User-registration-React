import React, { Component } from 'react';
import './main.css'
//import UserDelete from './form/form'
import Register from './Register/register'

class Main extends Component{

    constructor(){
        super();
        this.state = {
            all_users:[],
            newUser:{id:0,name:'',email:'',lastname:''},
            errorMsg:''
        }
        this.removeUser = this.removeUser.bind(this)
        this.inputChanged = this.inputChanged.bind(this)
        this.addUser = this.addUser.bind(this)
    }

    removeUser(id){

        if(window.confirm('Are you sure you want to remove the user '+id)){

            fetch(`https://reqres.in/api/users/${id}`,{
                method: 'DELETE'
            })
            .then(res =>{
                if(res.ok){
                    var current_users = this.state.all_users;
                    const users_left = current_users.filter(user => user.id!==id)
                    this.setState({all_users:users_left});
                }   
            })
        }
        return 
    }

    inputChanged = (e) =>{
        var user = this.state.newUser;
        
        if (e.target.id === "name"){
            user.name = e.target.value
        }else if(e.target.id ==="email"){
            user.email = e.target.value
        }else{
           user.lastname = e.target.value 
        }
        this.setState({
            newUser:user
        });
    }

    addUser(){

        if (this.state.newUser.name === '' || this.state.newUser.email === '' || this.state.newUser.lastname === ''){
            this.setState({errorMsg:'Input missing'});
            return
        }

        fetch('https://reqres.in/api/users',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(this.state.newUser)
        })
        .then(res => res.json())
        .then(data =>{
            this.setState(
                {
                    all_users:[...this.state.all_users,data],
                    newUser:{id:this.state.newUser.id+1,name:'',email:'',lastname:''},
                    errorMsg:''
                    }
                )
            }
        )
    }
    
    componentDidMount(){
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
                    }
                )
            this.setState({all_users:users})
            }
        )
    }

    render(){
        return(
        <div className='user'>
            <Register value = {this.state.newUser} inputChanged = {this.inputChanged} registerUser = {this.addUser} errorMsg = {this.state.errorMsg}/>
            {
                this.state['all_users'].map(user=>
                    <li key={user.id} className='user-data-father'>
                        <div className='user-data'>
                            <div className='form-group'>
                                <button className='delete-button' onClick={(e)=>{this.removeUser(user.id)}}>
                                    x
                                </button>
                            </div>   
                            <p>ID: {user.id}</p>
                            <p>Name: {user.name}</p>
                            <p>Last Name: {user.lastname}</p>
                            <p>Email: {user.email}</p>
                        </div>
                    </li>
                )
            }
        </div>
        )
    }

}

export default Main;