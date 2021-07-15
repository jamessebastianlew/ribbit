import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/global-context.js';

const UserImage = ({ username, className }) => {
    return <img className={className} src={`http://localhost:5000/api/get/avatar/${username}`} />
}

export default UserImage;