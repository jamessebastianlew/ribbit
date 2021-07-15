import express from 'express';
import mongoose from 'mongoose';
import mainRouter from './routes/mainRouter.js';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 5000;
// connect to mongodb and listen once done
const mongoURL = "mongodb://localhost:27017/forgDB";
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then((res) => {
    console.log(`MongoDB: connection to ${mongoURL} successful`)
    app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
})
.catch((err) => {
    console.log(err);
});

app.use(express.static('public'));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', mainRouter);