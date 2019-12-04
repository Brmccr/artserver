require('dotenv').config();

let express = require('express');
let app = express();
let user = require('./controllers/usercontroller')
let art = require('./controllers/artcontroller')
let comment = require('./controllers/commentcontroller')
let db = require('./db');

app.use(express.json());

db.sequelize.sync({force:true});
app.use(require('./middleware/headers'));

app.use('/art', art)
app.use('/user', user)
app.use('/comment', comment)
app.use('/api/test', function(req, res) {
    res.send("This is data from the /api/test endpoint. It's from the server.");
})


app.listen(process.env.PORT,  () => console.log(`App is listening on ${process.env.PORT}`));