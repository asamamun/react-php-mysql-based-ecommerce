import React, { useContext } from 'react';
import { AuthContext } from './../AuthContext';
export const Products = () => {
    const { authData } = useContext(AuthContext);
    return authData.status && (
        <div>
            <h1>products</h1>
            <ul>
                <li>items</li>
                <li>items</li>
                <li>items</li>
                <li>items</li>
                <li>items</li>
            </ul>
        </div>
    )
}