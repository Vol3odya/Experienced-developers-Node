import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import  validateBody  from '../utils/validateBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import  isValidId  from '../middlewares/isValidd.js';
import { getUsersController } from '../controllers/users.js';

const usersRoter = Router();

usersRoter.use(authenticate);

usersRoter.get('/userById', isValidId, ctrlWrapper(getUsersController));


export default usersRoter;
