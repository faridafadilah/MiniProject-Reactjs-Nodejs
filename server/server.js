const express = require('express'); // Framework Express
const bodyParser = require('body-parser'); // For parsing
const cors = require('cors'); // Module Cors
const app = express();

var corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/uploaded"));

// database
const db = require('./app/models');
const Role = db.role;

// Jika ingin Membuat table ulang
// db.sequelize.sync();

//force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// controller
const mainController = require('./app/controllers/mainForum.controller.js');
const subController = require('./app/controllers/subForum.controller.js');
const threadController = require('./app/controllers/thread.controller.js');
const postController = require('./app/controllers/post.controller.js');
// const profilController = require('./app/controllers/profile');

// route
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
app.use('/api/main', mainController);
app.use('/api/sub', subController);
app.use('/api/thread', threadController);
app.use('/api/post', postController);
// app.use('/api/profile', profilController);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Initial untuk Membuat Role [user, admin, super_admin]
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "super_admin"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}