import React, { useContext } from 'react';
import { AuthContext } from './../AuthContext';
export const Registration = () => {
    const { authData } = useContext(AuthContext);
    console.log(authData)
    return (
        <div>
            <h1>Registration</h1>
        </div>
    )
}