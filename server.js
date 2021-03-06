//initialize express
const express = require('express');
// for image upload
const multer = require('multer');
//embeded javascript module
const ejs = require('ejs');
const path = require('path');

// setup storage
const storage = multer.diskStorage({
   destination: './public/uploads/',
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
   storage: storage,
   limits: { fileSize: 5000000},
   fileFilter: function(req, file, cb){
      checkFileType(file, cb);
   }
}).single('Image');

// check file type
function checkFileType(file, cb){
   // Allowed ext
   const fileTypes = /jpeg|png|jpg/;
   //check ext
   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
   //check mime
   const mimetype = fileTypes.test(file.mimetype);

   if(mimetype && extname){
      return cb(null, true);
   }else{
      cb('Error: Images only!!')
   }
}

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
         if(req.file == undefined){
            res.render('index',{
               msg: 'Error: No file selected'
            });
         }else{
            res.render('index',{
               msg: ':>) File  Uploaded',
               file: `uploads/${req.file.filename}`
            });
         }
      }
   });
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));