module.exports = (sequelize, Sequelize) => {
  const Main = sequelize.define("mainforums", {
    title: Sequelize.STRING,
  });

  return Main;
};
