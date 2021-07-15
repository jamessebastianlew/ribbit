import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './contexts/global-context.js';
import UserImage from './components/UserImage.js';
import { RecordView } from './components/RecordView.js';
import Message from './components/Message.js';

const ConversationPage = () => {
    const { globalState } = useContext(GlobalContext);
    const { toUsername, username } = globalState;
    const [audioUrl, setAudioUrl] = useState('');
    const [audioStatus, setAudioStatus] = useState('');


    const [messHistory, setMessHistory] = useState([]);

    const updateHistory = () => {
        fetch('http://localhost:5000/api/post/get-conversation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ toUsername, fromUsername: username }),
        }).then(res => res.json()).then((newHistory) => {
            setMessHistory(newHistory);
        });
    };

    useEffect(() => {
        const updateHistory = () => {
            fetch('http://localhost:5000/api/post/get-conversation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toUsername, fromUsername: username }),
            }).then(res => res.json()).then((newHistory) => {
                if(newHistory.length !== messHistory.length || !newHistory.every((val, ind) => val._id === messHistory[ind]._id && val.updatedAt === messHistory[ind].updatedAt)) {
                    setMessHistory(newHistory);
                } else {
                    return setTimeout(updateHistory, 5000);
                }
            });
        };
        const timeout = updateHistory();
        return () => clearTimeout(timeout);
    }, [messHistory]);

    const handleClick = () => {
        fetch(audioUrl).then((res) => res.blob()).then((blob) => {
            const formData = new FormData();
            const audioFile = new File([blob], 'na.wav', { type: "audio/wav" });
            formData.append('messageaudio', audioFile, 'na.wav');
            formData.append('fromUsername', username);
            formData.append('toUsername', toUsername);
            formData.append('extra', {});

            return fetch('http://localhost:5000/api/post/upload/direct-message', {
                method: 'POST',
                body: formData,
            });
        }).then((res) => {
            setAudioUrl('');
            updateHistory();
        }).catch((err) => {
            throw err;
        });
    };

    return (
        <>
            <nav>
                <UserImage username={toUsername} />
                <header>{toUsername}</header>
            </nav>
            <div id="body">
                {messHistory.map((message, ind) => <Message
                    key={ind}
                    message={message}
                    className={message.fromUsername === username ? 'from' : 'to'}
                />)}
            </div>
            <footer>
                <RecordView setAudioStatus={setAudioStatus} setAudioUrl={setAudioUrl} />
                <button onClick={handleClick}>send</button>
            </footer>
        </>
    );

}

export default ConversationPage;