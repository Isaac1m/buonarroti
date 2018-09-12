require('dotenv').config();
const   express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const app = express();
const port = process.env.PORT || 4000;
const pusher = new Pusher({
    appId:  process.env.PUSHER_APP_ID,
    key:  process.env.PUSHER_APP_KEY,
    secret:  process.env.PUSHER_APP_SECRET,
    cluster: 'eu',
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use( (req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next ();
});

app.listen ( port, () => {
    console.log(`Server running on port ${port}`);
});

app.post ('/paint',(req, res) => {
    pusher.trigger ('buonarroti', 'draw', req.body);
    res.json(req.body);
})