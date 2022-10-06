// Access For Role
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
// Acces Role User
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
// Access Role Admin
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
// Access Super Admin
exports.superBoard = (req, res) => {
  res.status(200).send("Super Admin Content.");
};