import React from 'react';
import { withRouter } from 'react-router-dom';

const EditUser = (props)=>{
    return(
    	<div className="searchbar">
	        <form className="login-form" onSubmit={props.editUser.bind(null, props.newUsername)}>
		        <input className="login-input" type="text" name="username" value={props.newUsername} onChange={props.handleEditInput}/>
		        <button>Edit Your Username</button>
	        </form>
	    </div>
    )
}
export default withRouter(EditUser);