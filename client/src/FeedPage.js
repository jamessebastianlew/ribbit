import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserImage from './components/UserImage.js';
import { BackButton } from './components/BackButton';
import { GlobalContext } from './contexts/global-context.js';
import { FeedUnit } from './components/FeedUnit.js';
import ReactLoading from 'react-loading';


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
                    return setTimeout(updateFeed, 10000);
                }
            });

        };
        const timeout = updateFeed();
        return () => clearTimeout(timeout);
    }, [feed])

    return (
        <>
            <nav>
                <UserImage username={username} />
                <header>Ribbit</header>
                <Link to='/record-feed' >+</Link>
            </nav>
            <div id="body">
                <button onClick={() => setCurrent((current) => Math.max(0, current - 1))}>{'<'}</button>
                <button onClick={() => setCurrent((current) => Math.min(feed.length - 1, current + 1))}>{'>'}</button>
                {
                    feed.length === 0 ?
                    <ReactLoading height={'20%'} width={'20%'} /> :
                    <FeedUnit feedUnit={feed[current]} />
                }
            </div>
            <footer></footer>
        </>
    );

}

export default FeedPage;