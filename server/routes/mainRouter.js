import { Router } from 'express';
import mongoose from 'mongoose';
import { imageUpload, audioUpload, upload } from '../utils/multer.js';
import DirectMessage from '../models/DirectMessage.js';
import User from '../models/User.js';
import FeedMessage from '../models/FeedMessage.js';
import Language from '../models/Language.js';
import path from 'path';
import { rootDir } from '../config.js';

const mainRouter = Router();

// mainRouter.post('/send-message', (req, res) => {
//     const { content } = req.body;
//     const message = new Message({ content });
//     message.save()
//     .then((result) => {
//         res.json(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

mainRouter.post('/test/server-print', (req, res) => {
    console.log(req.body);
    res.send();
});

mainRouter.post('/test/upload-content', upload.single('uploadedcontent'), (req, res) => {
    console.log(req.file);
    res.send(req.file);
});

// GET avatar of user with username `username`
mainRouter.get('/get/avatar/:username', (req, res) => {
    const { username } = req.params;
    User.find({ username }).then((res) => {
        if(res.length !== 1) throw new Error('user not found while getting avatar');
        return res[0].imagePath;
    }).then((imagePath) => {
        res.sendFile(imagePath);
    }).catch((err) => {
        res.status(404).send();
    });
});


// GET get language list
mainRouter.get('/get/languages', (req, res) => {
    Language.find({}).then((result) => {
        res.json(result.map(langObj => langObj.languageName));
    }).catch((err) => {
        res.status(500).send();
    });
});

// GET audio file
mainRouter.get('/get/audio/:filename', (req, res) => {
    const { filename } = req.params;
    res.sendFile(path.join(rootDir, 'public/uploads/audio', filename));
})

// POST add language
mainRouter.post('/post/add-language', (req, res) => {
    const { languageName } = req.body;

    const language = new Language({ languageName });

    language.save().then((result) => {
        res.status(201).send();
    }).catch((err) => {
        res.status(500).send();
    });
});

// POST formdata: userimage, username, nativeLanguage, learnLanguage
mainRouter.post('/post/signup', imageUpload.single('avatar'), (req, res) => {
    const imagePath = req.file.path;
    const { username, nativeLanguage, learnLanguage } = req.body;
    if(nativeLanguage === learnLanguage) throw new Error('languages are the same');

    const user = new User({
        username, nativeLanguage, learnLanguage, imagePath
    });

    User.find({ username }).then((result) => {
        if(result.length !== 0) {
            throw new Error('username taken');
        }
        return user.save()
    }).then((result) => {
        res.status(201).send({ imagePath });
    }).catch((err) => {
        res.status(500).send();
        console.error("ERROR : when signing up : ", err);
    });
    /**/
});

mainRouter.post('/post/login', (req, res) => {
    const { username } = req.body;

    User.find({ username }).then((result) => {
        if(result.length === 0) {
            res.status(404).send();
            throw new Error('user doesn\'t exist');
        }
        res.send();
    }).catch((err) => {
        if(!res.headersSent) res.status(500).send();
        console.error("ERROR : when logging in : ", err);
    })
});

mainRouter.post('/post/get-user', (req, res) => {
    const { username } = req.body;

    User.find({ username }).then((result) => {
        if(result.length !== 1) {
            res.status(404).send();
            throw new Error('user doesn\'t exist');
        }
        res.json(result[0]);
    }).catch((err) => {
        if(!res.headersSent) res.status(500).send();
        console.error("ERROR : when logging in : ", err);
    })
});


mainRouter.post('/post/upload/direct-message', audioUpload.single('messageaudio'), (req, res) => {
    const audioPath = `/uploads/audio/${req.file.filename}`;
    const { toUsername, fromUsername, extra } = req.body;

    const directMessage = new DirectMessage({
        audioPath, toUsername, fromUsername, extra
    });
    
    directMessage.save().then((result) => {
        res.send({ audioPath, correctionAudioPath });
    }).catch((err) => {
        res.status(500).send();
        console.error("ERROR : when uploading direct message : ", err);
    });
});


mainRouter.post('/post/upload/feed-message', audioUpload.single('messageaudio'), (req, res) => {
    const audioPath = `/uploads/audio/${req.file.filename}`;
    const { fromUsername } = req.body;


    User.findOne({ username: fromUsername }).then((user) => {
        const { nativeLanguage, learnLanguage } = user;
        const feedMessage = new FeedMessage({
            audioPath, fromUsername, nativeLanguage, learnLanguage
        });
        return feedMessage.save();
    }).then((result) => {
        res.send({ audioPath });
    }).catch((err) => {
        res.status(500).send();
        console.error("ERROR : when uploading feed message : ", err);
    });
});

// post { username, nativeLanguage, learnLanguage}
mainRouter.post('/post/generate-feed', (req, res) => {
    const { username } = req.body;

    User.findOne({ username }).then((user) => {
        const { nativeLanguage, learnLanguage } = user;
        return FeedMessage.find({
            learnLanguage: nativeLanguage,
            nativeLanguage: learnLanguage
        }).sort({ updatedAt: 'desc' }).exec();
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send();
        console.error("ERROR : when generating feed : ", err);
    });
});

// POST { username }
mainRouter.post('/post/get-conversation-list', (req, res) => {
    const { username } = req.body;

    DirectMessage.find({ $or: [
        { toUsername: username },
        { fromUsername: username },
    ] }).sort({ updatedAt: 'desc' }).then((result) => {
        const users = [];
        for(directMessage of result) {
            const { fromUsername, toUsername } = directMessage;
            users.push(fromUsername === username ? toUsername : fromUsername);
        }
        return users;
    }).then((users) => {
        res.send(users);
    }).catch((err) => {
        res.status(500).send();
        console.error("ERROR : when getting conversation list message : ", err);
    });
});

// POST { toUsername, fromUsername }
mainRouter.post('/post/get-conversation', (req, res) => {
    const { toUsername, fromUsername } = req.body;

    DirectMessage.find({$or: [ 
        { toUsername: toUsername, fromUsername: fromUsername },
        { fromUsername: toUsername, toUsername: fromUsername },
    ]}).sort({ updatedAt: 'desc' }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send('not implemented');
        console.log("ERROR : when getting conversation : ", err);

    });
});

export default mainRouter;
