import { Router } from 'express';
import { validateInputUser } from '../middlewares';
import validateJWT from '../auth/validateJWT';
import { UserController } from '../controllers';

const router = Router();

router.post('/', validateInputUser, UserController.createUser);

router.get('/', validateJWT, UserController.getAllUsers);

router.get('/:id', validateJWT, UserController.getUserById);

router.delete('/me', validateJWT, UserController.deleteUser);

export default router;
