const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});

// Listen to the App Engine-specified port, or 8080 otherwise
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}...`);
// });

//using static files (css, js files etc..)
app.use(express.static('public'));
app.use(express.static('src'));

//add the router
app.use('/', router);

// app.use('/static', express.static('/../public'));
app.listen(process.env.port || 3000);