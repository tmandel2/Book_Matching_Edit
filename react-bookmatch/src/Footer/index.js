import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { PromiseProvider } from 'mongoose';

const Footer = (props)=>{
    return(
        <div className="header-footer">
            <ul>
                <li>&copy; 2019 Timothy Mandel and Jacob Mink</li>
                {props.user.username ? <li><button onClick={props.logout}>Logout</button></li> : null}
            </ul>
            
        </div>
    )
}

export default withRouter(Footer);