const express = require('express'); // Framework Express
const FileUpload = require('express-fileupload');
const bodyParser = require('body-parser'); // For parsing
const cors = require('cors'); // Module Cors
const app = express();

var corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(FileUpload());
app.use(express.static("public"));

// Models Tabel
const db = require('./app/models');
const Role = db.role;

// Refresh Table
// db.sequelize.sync();

// // // Force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Route
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/mainForum.routes')(app);
require('./app/routes/subForum.routes')(app);
require('./app/routes/thread.routes')(app);
require('./app/routes/post.routes')(app);
require('./app/routes/profile.routes')(app);
require('./app/routes/userRole.routes')(app);
require('./app/routes/superAdmin.routes')(app);


// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Initial to Create Role [user, admin, super_admin]
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