//initialize express
const express = require('express');
// for image upload
const multer = require('multer');
//embeded javascript module
const ejs = require('ejs');
const path = require('path');

// initialize app
const app = express();

//set EJS for view engine
app.set('view engine', 'ejs');

// set Public Folder
app.use(express.static('./public'));

//create index route
// render a template
app.get('/', (req, res) => res.render('index'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));