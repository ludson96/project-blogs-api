import { Router } from 'express';
import { CategoryController } from '../controllers';
import { validateInputCategory } from '../middlewares';
import validateJWT from '../auth/validateJWT';

const router = Router();

router.post('/', validateJWT, validateInputCategory, CategoryController.createCategory);

router.get('/', validateJWT, CategoryController.getAllCategory);

export default router;
