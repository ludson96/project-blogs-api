module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
   {
     timestamps:false,
     tableName: 'posts_categories',
     underscored: true,
   });

   PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'idPost',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'idCategory',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
   };

  return PostCategory;
}

