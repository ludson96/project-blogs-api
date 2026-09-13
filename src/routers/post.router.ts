import { Router } from 'express';
import validateJWT from '../auth/validateJWT';
import { validateInputBlogPostUpdated, validateInputNewBlogPost } from '../middlewares';
import { blogPostController } from '../controllers';

const router = Router();

router.get('/search', validateJWT, blogPostController.searchBlogPost);

router.get('/', validateJWT, blogPostController.getAllBlogPost);

router.get('/:id', validateJWT, blogPostController.getBlogPostById);

router.put(
  '/:id',
  validateJWT,
  validateInputBlogPostUpdated,
  blogPostController.updateBlogPost,
);

router.post('/', validateJWT, validateInputNewBlogPost, blogPostController.createPost);

router.delete('/:id', validateJWT, blogPostController.deletePost);

export default router;
