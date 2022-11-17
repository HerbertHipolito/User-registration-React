import React from 'react';
import './footer.css';

function footer(props){
    return(
    <footer id={props.current_component}>
       <p> Acess my <a href='https://github.com/HerbertHipolito/Users-registration-page-using-React'>Github</a> for more information</p>
    </footer>
    )
}

export default footer;