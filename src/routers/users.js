import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import  validateBody  from '../utils/validateBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import  isValidId  from '../middlewares/isValidd.js';
import { getUsersController, getUsersWaterRateController, updateUserInfoController, updateUserPhotoController } from '../controllers/users.js';
import { updatePhotoSchema, updateUsersSchema, updateWateRateSchema } from '../validation/users.js';
import { upload } from '../middlewares/multer.js';

const usersRoter = Router();

usersRoter.use(authenticate);

usersRoter.get('/userById', isValidId, ctrlWrapper(getUsersController));
usersRoter.patch('/waterRate', isValidId, validateBody(updateWateRateSchema), ctrlWrapper(getUsersWaterRateController));
usersRoter.patch('/avatar', isValidId, upload.single('photo'), validateBody(updatePhotoSchema), ctrlWrapper(updateUserPhotoController));
usersRoter.patch('/update', validateBody(updateUsersSchema), ctrlWrapper(updateUserInfoController));


export default usersRoter;
