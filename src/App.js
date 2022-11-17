import './App.css';
//import Main from './components/main.js'
import HomePage from './components/home/home.js'
import ListUsers from './components/list/list';
import Register from './components/register/register';
import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,Link,Routes,Route} from 'react-router-dom';


function App() {

  
  const [name,setName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [errorMsg,setError] = useState('');
  const [allUsers,setAllUsers] = useState([]);
  const [loadingMsg,setLoadingMsg] = useState(false);

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
          setAllUsers(users.slice(0,2))
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

      if(email.indexOf('@') === -1){
          setError('Email address invalid. @ not found.');
          return
      }

      for(let myUser of allUsers){
          if (myUser.email === email){
              setError('Email address already exists');
              return
          }
      }

      setLoadingMsg(true);
      setError('');
      
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
          setError('')
          setAllUsers([...allUsers,data])
          setLoadingMsg(false);
          }
      )
  }
  

  return (
    <>
      <Router>
        <div className="App">
          <header id="App-header">
            <p id="my-name-bro">Herbert Hipólito</p>
            <ul>
              <li><Link to="/" className='link-name'>Home</Link></li>
              <li><Link to="/listUsers" className='link-name'>List users</Link></li>
              <li><Link to="/registerUsers" className='link-name'>Add user</Link></li>
            </ul>        
          </header>
          <Routes >
            <Route path="/" element = {<HomePage/>}/>
            <Route path="/listUsers" element = {<ListUsers allUsers = {allUsers} removeUser={removeUser}/>}/>
            <Route path="/registerUsers" element = {<Register value = {{email,lastName,name}} inputChanged={inputChanged} registerUser={addUser} errorMsg={errorMsg} loadingMsg={loadingMsg}/>}/>
          </Routes >
        </div>
      </Router>
      
    </>
  );
}

export default App;
