import React from 'react';
import { useHistory } from 'react-router-dom';

function Logout() {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('user');
        history.push('/login');
    };

    return (
        <button className="button" onClick={handleLogout}>Logout</button>
    );
}

export default Logout;
