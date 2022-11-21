import React from 'react';
import './home.css';
import Footer from '../footer/footer';

function homePage(){

    return(
        <>
            <main id="home-page">
                <h1>Hello, Welcome to my first React application</h1>
                <p>
                    I have been studying React for some weeks to improve my front-end skill and, here, I show part of my knowledge of that Framework and its main functionalities.
                    In this project, you can register and list users and their data such as name, last name, and email. I used Node.js to create the backend.<br/>
                    <br/>
                    To verify the functionalities of this application, click on one of the top-right buttons in the header.
                </p>
            </main>
            <Footer current_component = {'homePage'}/>
        </>
    )
}

export default homePage