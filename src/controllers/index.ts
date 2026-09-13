import * as blogPostController from './blogpost.controller';
import * as CategoryController from './category.controller';
import * as UserController from './user.controller';

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
