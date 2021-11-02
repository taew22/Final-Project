const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
const isAuthenController = require('./authen/isAuthenController')//ลิ้งนี้ทำให้ไม่สามารถโชว์สมาชิกได้
const BlogController = require('./controllers/BlogController')
const CommentController = require('./controllers/CommentController')
const GardenController = require('./controllers/GardenController')

let multer = require("multer")
//image
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    //callback(null, file.fieldname + '-' Date.now());
    console.log(file);
    callback(null, file.originalname);
  }
})

let upload = multer({ storage: storage }).array("userPhoto", 10)

module.exports = (app) => {
  app.post('/user', UserController.create)
  app.put('/user/:userId', UserController.put)
  app.delete('/user/:userId', UserController.remove)
  app.get('/user/:userId', UserController.show)
  app.get('/users', isAuthenController, UserController.index)//นี่อีก isAuthenController
  //login
  app.post('/login', UserAuthenController.login)
  //blog
  app.post('/blog', BlogController.create)
  app.put('/blog/:blogId', BlogController.put)
  app.delete('/blog/:blogId', BlogController.remove)
  app.get('/blog/:blogId', BlogController.show)
  app.get('/blogs', BlogController.index)
  
//garden
app.post('/garden', GardenController.create)
app.put('/garden/:gardenId', GardenController.put)
app.delete('/garden/:gardenId', GardenController.remove)
app.get('/garden/:gardenId', GardenController.show)
app.get('/gardens', GardenController.index)

  //comment
  app.post('/comment', CommentController.create)
  app.put('/comment/:commentId', CommentController.put)
  app.delete('/comment/:commentId', CommentController.remove)
  app.get('/comment/:commentId', CommentController.show)
  app.get('/comments', CommentController.index)
  
  //upload
  app.post('/upload', function (req, res) {
    upload(req,res, function(err){
      //isUserAuthenicated,
      if (err) {
        return res.end("Error uploading file.")
      }
      res.end("File is upload")
    })
  })
  //delete file uploaded function
  app.post('/upload/delete',async function (req, res) {
    try {

      const fs = require('fs');
      console.log(req.body.filename)
      fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename,
      (err) => {
        if (err) throw err;
        res.send("Delete sucessful")
        //console.log('successfully deleted material file');
      });
    }catch (err) {
      res.status(500).send({
        error:'An error has occured trying to  delete file the material'
      })
    }
  })
}