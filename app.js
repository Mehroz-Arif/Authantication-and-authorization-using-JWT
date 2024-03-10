if (process.env.NODE_ENV != "production") {
  require('dotenv').config()

}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
let ejs = require('ejs');
const ejsMate= require('ejs-mate');
const path = require("path");
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended :true}))
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser())
const url="mongodb://127.0.0.1:27017/loginAuthWithJWt";

async function main() {
  if(await mongoose.connect(url)){
    console.log("connected to succesfully");
  }
  
}
main()


app.use('/', authRoutes);

app.use('/events', eventRoutes);

app.listen(8000, () => console.log(`Server started on port 8000`));