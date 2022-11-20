import './App.css';
//import Main from './components/main.js'
import HomePage from './components/home/home.js'
import ListUsers from './components/list/list';
import Register from './components/register/register';
import React from 'react';
import {BrowserRouter as Router,Link,Routes,Route} from 'react-router-dom';
import UserDetail from './components/userDetail/userDetail.js';


function App() {

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
            <Route path="/user/list" element = {<ListUsers />}/>
            <Route path="/user/register" element = {<Register  />}/>
            <Route path="/user/:id" element = {<UserDetail/>}/>
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
