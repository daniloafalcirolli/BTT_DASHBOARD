import React from 'react'
import { Navigate } from 'react-router-dom';
import { API_URL } from '../../config';

const ProtectedRoute = ({ children }) => {
    let login = false;
    let token = window.localStorage.getItem('token');

    if(token == null || token == ""){
        login = false;
    } else {
        let user = JSON.parse(token);
        if(user.email != "" && user.password != ""){
            login = true;
        } else {
            login = false;
        } 
    }

    return login ? children : <Navigate to='/login' />
}

export default ProtectedRoute;