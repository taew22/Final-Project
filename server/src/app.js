let express = require('express')
let cors = require('cors')

const {sequelize} = require('./models')
const config = require('./config/config')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use('/assets',express.static('public'))

require('./userPassport')//บท9 ลิ้งกับไฟล์ userPassport
require('./routes')(app)

let port = process.env.PORT || config.port

sequelize.sync({force: false}).then(() => {
  app.listen(port, function() {
      console.log('Server running on ' + port)
  })
})