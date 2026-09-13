import * as blogPostController from './blogpost.controller';
import * as CategoryController from './category.controllers';
import * as UserController from './user.controllers';

export {
  blogPostController,
  CategoryController,
  UserController,
};

export default {
  ...blogPostController,
  ...CategoryController,
  ...UserController,
  CategoryController,
  UserController,
};
