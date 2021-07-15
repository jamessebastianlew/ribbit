import React from 'react';

const Message = ({ message, className }) => {
    return <div className={className}>
        <audio src={'http://localhost:5000' + message.audioPath} controls/>
    </div>;
};

export default Message;