const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});

//using static files (css, js files etc..)
app.use(express.static('public'));
app.use(express.static('src'));

//add the router
app.use('/', router);

app.listen(process.env.port || 3000);