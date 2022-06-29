import React from 'react';
import * as mutations from '../store/mutations';
import {connect } from 'react-redux';

const LoginComponent = ({authenticateUser, authenticated}) =>{
    return <div>
        <h2>
        Please login
        </h2>
        <form onSubmit={authenticateUser}>
            <input type="text" placeholder="username" name="username" defaultValue="Dev" className="form-control"/>
            <input type="password" placeholder="password" name="password" defaultValue="" className="form-control mt-2"/>
            {authenticated === mutations.NOT_AUTHENTICATED ? <p>Login Incorrect</p> : null}
            <button type="submit">Login</button>
        </form>
    </div>
};

const mapStateToProps =({session})=>({
    authenticated:session.authenticated
})

const mapDispatchToProps = (dispatch) =>({

    authenticateUser(e){
        e.preventDefault();
        console.log(e.target[`username`].value);
        let username = e.target[`username`].value;
        let password = e.target[`password`].value;
        dispatch(mutations.requestAuthenticateUser(username,password));
    }

});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
