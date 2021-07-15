import React from 'react';
import UserImage from './UserImage.js';

const FeedUnit = ({ feedUnit }) => {
    const { fromUsername, audioPath } = feedUnit;
    console.log(audioPath);
    return (
        <>
            <UserImage username={fromUsername} />
            <audio src={audioPath} controls />
        </>
    );
};

export { FeedUnit };