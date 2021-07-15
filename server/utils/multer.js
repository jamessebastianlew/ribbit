import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { rootDir } from '../config.js';

const imageStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(rootDir, 'public/uploads/images/'));
    },
    filename: (req, file, callback) => {
        callback(
            file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ? null : new Error('invalid filetype'),
            crypto.randomUUID() + '.' + (file.mimetype === 'image/jpeg' ? 'jpg' : 'png')
        );
    },
})

const audioStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(rootDir, 'public/uploads/audio/'));
    },
    filename: (req, file, callback) => {
        callback(
            file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav' ? null : new Error('invalid filetype'),
            crypto.randomUUID() + '.' + (file.mimetype === 'image/mpeg' ? 'mp3' : 'wav')
        );
    },
})

const audioUpload = multer({ storage: audioStorage });
const imageUpload = multer({ storage: imageStorage });
const upload = multer({ dest: path.join(rootDir, 'public/uploads/') });

export { audioUpload, imageUpload, upload };