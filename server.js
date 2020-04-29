//initialize express
const express = require('express');
// for image upload
const multer = require('multer');
//embeded javascript module
const ejs = require('ejs');
const path = require('path');

// setup storage
const storage = multer.diskStorage({
   dest: './public/uploads/',
   filename: function(req, file, cb){
      cb(
         null, 
         file.fieldname + 
         '-' + Date.now() + 
         path.extname(file.originalname)
      );
   }
});

// initialize upload
const upload = multer({
   storage: storage
}).single('Image');

// initialize app
const app = express();

//set EJS for view engine
app.set('view engine', 'ejs');

// set Public Folder
app.use(express.static('./public'));

//create index route
// render a template
app.get('/', (req, res) => res.render('index'));

// post route to submit images
app.post('/upload', (req, res) => {
   upload(req, res, (err) => {
      if(err){
         res.render('index', {
            msg: err
         })
      }else{
         console.log(req.file);
         res.send('test upload')
      }
   });
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));