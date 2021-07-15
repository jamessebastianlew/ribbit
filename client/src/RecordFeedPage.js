import React, { useContext, useState } from 'react';
import { BackButton } from './components/BackButton';
import { RecordView } from './components/RecordView';
import { GlobalContext } from './contexts/global-context';

const RecordFeedPage = () => {
    const [audioStatus, setAudioStatus] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const { globalState } = useContext(GlobalContext);
    const { username, nativeLanguage, learnLanguage } = globalState;

    const handleClick = () => {
        fetch(audioUrl).then((res) => res.blob()).then((blob) => {
            const formData = new FormData();
            const audioFile = new File([blob], 'na.wav', { type: "audio/wav" });
            formData.append('messageaudio', audioFile, 'na.wav');
            formData.append('fromUsername', username);

            return fetch('http://localhost:5000/api/post/upload/feed-message', {
                method: 'POST',
                body: formData,
            });
        }).catch((err) => {
            throw err;
        });
    };

    return (
        <>
            <nav>
                <BackButton />
                <header>Ribbit</header>
            </nav>
            <div id="body">
                <h1>Customise Feed Message</h1>
                <p>This message will be shown on other people's feeds</p>
                <div id="record-bar">
                    <audio src={audioUrl} controls />
                    <RecordView setAudioStatus={setAudioStatus} setAudioUrl={setAudioUrl} />
                    {
                        audioUrl === '' ?
                        <button disabled>Save</button> :
                        <button onClick={handleClick}>Save</button>
                    }
                </div>
                
            </div>
            <footer></footer>

        </>
    )

};

export default RecordFeedPage;