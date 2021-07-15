import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserImage from './components/UserImage.js';
import { BackButton } from './components/BackButton';
import { GlobalContext } from './contexts/global-context.js';
import { FeedUnit } from './components/FeedUnit.js';


const FeedPage = () => {
    const { globalState } = useContext(GlobalContext);
    const { username } = globalState;
    const [ current, setCurrent ] = useState(0);
    const [ feed, setFeed ] = useState([]);

    useEffect(() => {
        const updateFeed = () => {
            fetch('http://localhost:5000/api/post/generate-feed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
            }).then(res => res.json()).then((newFeed) => {
                if(newFeed.length !== feed.length || !newFeed.every((val, ind) => val._id === feed[ind]._id && val.updatedAt === feed[ind].updatedAt)) {
                    setFeed(newFeed);
                } else {
                    setTimeout(updateFeed, 10000);
                }
            });

        };
        updateFeed();
    }, [feed])

    return (
        <>
            <nav>
                <UserImage username={username} />
                <header>Ribbit</header>
                <Link to='/record-feed' >+</Link>
            </nav>
            <div id="body">
                <FeedUnit feedUnit={feed[current]} />
            </div>
            <footer></footer>
        </>
    );

}

export default FeedPage;