import createHttpError from 'http-errors';
import { getUserProfile } from '../services/users.js';

export const getUsersController = async (req, res, next) => {
  const userId = req.user._id;
  
  const userById = await getUserProfile(userId);

  if (userById === null) {
    return next(createHttpError('User not found'));
  }

  res.send({
    status: 200,
    message: `User successfully found`,
    data: userById,
  });
};
