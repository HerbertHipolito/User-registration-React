import './App.css';
//import Main from './components/main.js'
import HomePage from './components/home/home.js'
import ListUsers from './components/list/list';
import Register from './components/register/register';
import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,Link,Routes,Route} from 'react-router-dom';
import UserDetail from './components/userDetail/userDetail.js';


function App() {
  
  const [allUsers,setAllUsers] = useState([]);

  useEffect( (e)=> {
      fetch('https://reqres.in/api/users')
      .then(res=>res.json())
      .then(datas=>{
          const users = datas.data.map(user => {
            return {
                id:user.id,
                name:user.first_name,
                lastName:user.last_name,
                email:user.email
                }
            })
          setAllUsers(users)
          })
      }
  ,[])

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
  }

  return (
    <>
      <Router>
        <div className="App">
          <header id="App-header">
            <p id="my-name-bro">Herbert Hipólito</p>
            <nav>
            <ul>
              <li><Link to="/" className='link-name'>Home</Link></li>
              <li><Link to="/user/list" className='link-name'>List users</Link></li>
              <li><Link to="/user/register" className='link-name'>Add user</Link></li>
            </ul>
            </nav>        
          </header>
          <Routes >
            <Route path="/" element = {<HomePage/>}/>
            <Route path="/user/list" element = {<ListUsers allUsers = {allUsers} removeUser={removeUser}/>}/>
            <Route path="/user/register" element = {<Register allUsers={allUsers} setAllUsers={setAllUsers} />}/>
            <Route path="/user/:id" element = {<UserDetail allUsers = {allUsers} removeUser={removeUser}/>}/>
            <Route path="*" element = {<PageNotFound/>}/>
          </Routes >
        </div>
      </Router>
      
    </>
  );
}

function PageNotFound(){

    return (
        <div id = 'not-found-div'>
            <p>page not found - 404</p>
        </div>
    )
     
  }

export default App;
