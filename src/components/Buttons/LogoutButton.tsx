// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './BaseButton';
import { deleteCookies } from '../../utils/cookieHandle';

const LogoutButton = () => {
    return (
        <Link to="/" onClick={deleteCookies}>
            <Button
                title="Logout"
                // link="/"
                color="bg-red-500"
            />
        </Link>
    );
};

export default LogoutButton;
