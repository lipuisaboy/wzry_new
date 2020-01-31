const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.set('secret','19970217')

// 静态文件托管
app.use('/uploads',express.static(__dirname + '/uploads'))
app.use('/',express.static(__dirname +'/web'))
app.use('/admin',express.static(__dirname +'/admin'))

require('./routes')(app)
require('./mongo/db')(app)

app.listen(3002,() => {
  console.log('Server is Running')
})