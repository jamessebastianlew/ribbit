import React from 'react';
import UserImage from './UserImage.js';

const FeedUnit = ({ feedUnit }) => {
    const { fromUsername, audioPath } = feedUnit;
    console.log(audioPath);
    return (
        <>
            <UserImage username={fromUsername} />
            <audio src={'http://localhost:5000' + audioPath} controls />
        </>
    );
};

export { FeedUnit };