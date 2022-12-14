module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("posts", {
    threadId: Sequelize.INTEGER,
    content: Sequelize.TEXT,
    userId: Sequelize.INTEGER,
    nameUser: Sequelize.STRING,
    imageUser: Sequelize.STRING,
  });

  return Post;
};
