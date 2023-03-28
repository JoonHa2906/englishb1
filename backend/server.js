const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(express.json());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
var corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//mongodb
const db = require('./app/models');
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    });

// Route
app.get('/', (req, res) => {
    res.send('Home Page');
});

require('./app/routes/user.routes')(app);
require('./app/routes/permission.routes')(app);
require('./app/routes/search.routes')(app);
require('./app/routes/reading.routes')(app);
require('./app/routes/listening.routes')(app);
require('./app/routes/result.routes')(app);
require('./app/routes/testing.routes')(app);
require('./app/routes/matchimgvoca.routes')(app);
require('./app/routes/ratting.routes')(app);
require('./app/routes/slider.routes')(app);
require('./app/routes/email.routes')(app);
require('./app/routes/notification.routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
