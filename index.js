const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// xử dụng thêm cookies-parser để lưu token vào phía cookies ở server
require("dotenv").config()
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
const port = process.env.PORT
const database=require("./config/database.js")
database.connect();
const routesApiVer1=require("./api/v1/routes/index.route.js")
routesApiVer1(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})