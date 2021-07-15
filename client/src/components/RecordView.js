import React, { useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

const RecordView = ({ setAudioStatus, setAudioUrl }) => {
    const [recording, setRecording] = useState(false);
    const {
        status, startRecording, stopRecording, mediaBlobUrl
    } = useReactMediaRecorder({ 
        video: false,
        audio: true,
        blobPropertyBag: {
            type: "audio/wav"
        },
    });

    useEffect(() => {
        setAudioUrl(mediaBlobUrl);
    }, [mediaBlobUrl]);

    useEffect(() => {
        setAudioStatus(status);
    }, [status]);

    const handleClick = () => {
        if(recording) stopRecording();
        else startRecording();
        setRecording(!recording);
    };

    return (
        <div>
            <button onClick={handleClick}>{recording ? 'stop' : 'start'}</button>
        </div>
    );
};

export { RecordView };