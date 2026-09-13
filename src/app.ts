import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { UserController } from './controllers';
import { validateEmailPwd } from './middlewares';
import swaggerDocument from './docs/swagger.json';
import { categoriesRouter, postRouter, userRouter } from './routers';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (_req: Request, res: Response) => {
  res.redirect('/api-docs');
});

app.use('/post', postRouter);

app.use('/categories', categoriesRouter);

app.use('/user', userRouter);

app.post('/login', validateEmailPwd, (req: Request, res: Response) => UserController.loginUser(req, res));

export default app;
