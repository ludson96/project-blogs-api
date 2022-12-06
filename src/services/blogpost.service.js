const { BlogPost, User, Category } = require('../models');

const getAllBlogPost = async () => BlogPost.findAll({
  include: [{
     model: User,
     as: 'user',
     attributes: { exclude: ['password'] }, 
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
});

module.exports = {
  getAllBlogPost,
};