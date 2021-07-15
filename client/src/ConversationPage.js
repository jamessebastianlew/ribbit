import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './contexts/global-context.js';
import UserImage from './components/UserImage.js';

const ConversationPage = () => {
    const { globalState } = useContext(GlobalContext);
    const { toUsername, username } = globalState;


    const [messHistory, setMessHistory] = useState([]);

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

    return (
        <>
            <nav>
                <UserImage username={toUsername} />
                <header>{toUsername}</header>
            </nav>
            <div id="body">


            </div>
            <footer>

            </footer>
        </>
    );

}

export default ConversationPage;