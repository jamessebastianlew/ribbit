import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserImage from './UserImage.js';
import { GlobalContext } from '../contexts/global-context.js';


const FeedUnit = ({ feedUnit }) => {
    const { fromUsername, audioPath } = feedUnit;
    const { globalDispatch } = useContext(GlobalContext);

    const handleClick = () => {
        globalDispatch({ type: 'SET_KEY', payload: { key: 'toUsername', value: fromUsername }});
        history.push('/conversation');
    };

    return (
        <>
            <UserImage username={fromUsername} />
            <audio src={'http://localhost:5000' + audioPath} controls />
            <button onClick={handlClick}>start a conversation</button>
        </>
    );
};

export { FeedUnit };