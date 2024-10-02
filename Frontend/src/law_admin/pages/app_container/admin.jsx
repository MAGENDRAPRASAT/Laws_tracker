import React, { useEffect, useState } from 'react'
import Login from '../auth/login';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

    const navigate = useNavigate();

    const userIsLoggedIn = sessionStorage.getItem("user_logged_in") ?? false

    useEffect(() => {
        if (!userIsLoggedIn) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            {userIsLoggedIn && (
                <div>Admin</div>
            )}
        </>
    )
}

export default Admin