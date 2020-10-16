const mongo = require('mongodb');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 8080;
const Child = require('./child.model');
const router = require('./routes/index');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', router);

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
mongoose.connection.once('open', function () {
    console.log('Connected to the Database.');
});
mongoose.connection.on('error', function (error) {
    console.log('Mongoose Connection Error : ' + error);
});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'Roster-Project-client', 'roster_app', 'build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Roster-Project-client', 'roster_app', 'build', 'index.html'));
})

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}.`);
});