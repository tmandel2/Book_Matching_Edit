import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { PromiseProvider } from 'mongoose';

const Header = (props)=>{
    return(
        <div className="header-footer">
            <h1>BookMatch</h1>
            {props.user.username ? <ul>
                <li><Link to="/profile">My Profile</Link></li>
                <li><Link to="/booksindb">Books in Database</Link></li>
                <li><Link to="/books">Search for Books</Link></li>
            </ul> : null}
            
        </div>
    )
}

export default withRouter(Header);