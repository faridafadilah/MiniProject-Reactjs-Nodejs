module.exports = (sequelize, Sequelize) => {
  const Thread = sequelize.define("threads", {
    title: Sequelize.STRING,
    subforumId: Sequelize.INTEGER,
    content: Sequelize.STRING,
    userId: Sequelize.INTEGER,
    imageThread: Sequelize.STRING,
  });

  return Thread;
};
