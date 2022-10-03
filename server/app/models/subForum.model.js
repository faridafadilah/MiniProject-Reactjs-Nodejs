module.exports = (sequelize, Sequelize) => {
    const Sub = sequelize.define("subforums", 
    { 
        judul: Sequelize.STRING,
        mainforumId: Sequelize.INTEGER
    },
    {
      timestamps: true 
    }
    );
  
    return Sub;
};