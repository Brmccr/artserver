require('dotenv').config();

let express = require('express');
let app = express();
let art = require('./controllers/artcontroller')
let db = require('./db');

app.use(express.json());

db.sequelize.sync();
app.use(require('./middleware/headers'));

app.use('/art', art)

app.use('/api/test', function(req, res) {
    res.send("This is data from the /api/test endpoint. It's from the server.");
})


app.listen(process.env.PORT,  () => console.log(`App is listening on ${process.env.PORT}`));